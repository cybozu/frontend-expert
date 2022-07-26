---
title: "Vite 3.0 の内容をおさらいする"
author: "mugi"
createdAt: "2022-07-25"
summary: "Vite 3.0 の内容をおさらいします"
tags:
  - Vite
---

2022/7/13に、フロントエンドツールである Vite の v3.0.0 がリリースされました 🎉

- [Vite 3.0 is out! | Vite](https://vitejs.dev/blog/announcing-vite3.html)
- [CHANGELOG](https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/CHANGELOG.md)
- [Migration from v2 | Vite](https://vitejs.dev/guide/migration.html)

このエントリーでは、リリース時に公開されたブログ([Release v3.0.0 · vitejs/vite](https://github.com/vitejs/vite/releases/tag/v3.0.0))の内容をベースに、変更点を改めて１つずつ掘り下げて確認してみます。


### New Documentation

公式ドキュメント([vitejs.dev](https://ja.vitejs.dev/))が [VitePress](https://vitepress.vuejs.org/) のデフォルトテーマを利用した形で刷新されました。ダークテーマ表示などが可能になっています。

また、あわせて次のサブドメインでもドキュメントを閲覧できるようになっています。

- [v2.vitejs.dev](https://v2.vitejs.dev/) - Vite 2.x 系のドキュメント
- [main.vitejs.dev](https://main.vitejs.dev/) - Vite のメインブランチの内容

### Create Vite Starter Templates

Vite プロジェクトの Scaffold ジェネレータである [`create-vite`](https://github.com/vitejs/vite/tree/main/packages/create-vite) について、Vite 3.x が利用されるようになりました。

### Dev Improvements

#### Vite CLI

デフォルトの開発サーバーポートが `5173`、プレビューサーバーのポートが `4173` に変更されました。デフォルトポートは以前は `3000` と `5000` でしたが、MaxOS でポートの衝突が発生するなどの[問題があった](https://github.com/vitejs/vite/issues/5707)ようです。

ちなみになぜ `5173` という中途半端な数字なのだろう？と思い調べてみましたが、以下の Issue コメントを見つけました。

https://github.com/vitejs/vite/pull/6330#issuecomment-1003405068

```
At a team meeting we thought about 5173
Like 5173 in leet for Vite | V I T Ǝ | V === Roman 5
```

- V … 5
- I … 1
- T … 7
- Ǝ … 3

らしいです。cool

#### Improved WebSocket Connection Strategy

Vite 2.x までは、Proxy を経由したサーバー確立に課題があったとのことで、3.0 からはそれが改善されました。

[`vite-setup-catalogue`](https://github.com/sapphi-red/vite-setup-catalogue) というセットアップのサンプルリポジトリ内にも追加されたことで、今後は同パターンは CI で検証されるようになったとのことです。

#### Cold Start Improvements

コールドスタート時に依存関係を後から解決する際に、依存の状態によってはフルリロードが発生する可能性があったのが、ブラウザに依存を渡すタイミングを調整することで効率化され、回避可能になったようです。

詳細: https://github.com/vitejs/vite/pull/8869#issuecomment-1172902125

#### import.meta.glob

Vite では以前から [`Glob Import`](https://vitejs.dev/guide/features.html#glob-import) と呼ばれる機能が存在し、特別な関数 `import.meta.glob` を介して glob 形式で記述してのモジュール一括インポートが可能です。

Vite 3.0 では機能が強化され、より柔軟が指定が可能になりました。

- Multiple Patterns : 複数の glob パターンの記述
- Negative Patterns : 除外パターンの記述
- Named Imports : モジュールの一部のみを指定可能
- Custom Queries : クエリの付与
- Eager Imports : Dynamic import の回避

#### Aligning WASM Import with Future Standards

Vite 2.x から WebAssembly を 

```js
import init from './example.wasm'
```

の形で import できましたが、将来的に ESM の仕様として WebAssembly が統合された場合のバッティングを考慮し、

```js
import init from './example.wasm?init'
```

と、`?init` オプションが付与された場合に Vite 2.x 以前と同様の挙動になるよう変更されました。

現状で `?init` オプションを付与せずに ESM として処理する場合には [`vite-plugin-wasm`](https://github.com/Menci/vite-plugin-wasm)のようなプラグインの利用が必須となります。

### Build Improvements

#### ESM SSR Build by Default

SSR 用フレームワークの大半が ESM ビルドを利用するようになったため、
Vite3 では SSR ビルドのデフォルト形式が ESM に変更されました。

Vite では、モジュールの形式(CommonJS/ESM)などに応じて、適宜 Vite の変換から切り離す（外部化する）ことで SSR 時の処理を効率化しています。

参考: https://v2.vitejs.dev/guide/ssr.html#ssr-externals

ESM がデフォルトになったことで、デフォルトで外部化される依存が増え、より効率的に SSR ビルドが可能になるようです。

なお、ESM になると困るケースのために `legacy.buildSsrCjsExternalHeuristics: true` というオプションも用意されているようです。

#### Improved Relative Base Support

`base` に `''` を指定することで、相対的なベースパスの指定ができるようになりました。
ビルドの段階でベースパスが不明なケースなどで役に立つようです。

### Experimental Features

#### Built Asset Paths fine-grained Control (Experimental)

`experimental.renderBuiltUrl` オプションが Experimental 機能として導入されました。

CDN での配布などを前提とした場合、ビルドによって生成されたアセットのうち一部のみ URL が異なるケースが考えられます。

`experimental.renderBuiltUrl` を指定することで、ファイル名・ファイルタイプなどを利用して URL を切り分けられるようになります。


※公式ドキュメントよりコードを抜粋
https://vitejs.dev/guide/build.html#advanced-base-options

```ts
experimental: {
  renderBuiltUrl(filename: string, { hostType: 'js' | 'css' | 'html', type: 'public' | 'asset' }) {
    if (type === 'public') {
      return 'https://www.domain.com/' + filename
    }
    else if (path.extname(importer) === '.js') {
      return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
    }
    else {
      return 'https://cdn.domain.com/assets/' + filename
    }
  }
}
```

#### Esbuild Deps Optimization at Build Time (Experimental)

`optimizeDeps.disabled: false` 指定が Experimental 機能として可能になりました。
https://vitejs.dev/guide/migration.html#experimental

Vite はデフォルトでは開発時には esbuild を用い、ビルド時には Rollup を利用します。
開発時とビルド時で異なるツールを利用するため、Vite を利用する際に考慮すべき大きい要素の一つとして挙げられます。

参考: [Why Not Bundle with esbuild?](https://vitejs.dev/guide/why.html#why-not-bundle-with-esbuild)

`optimizeDeps.disabled: false` を用いると、ビルド時にも esbuild を利用するようになります。

CJS のみの依存関係も ESM に変換されるため、`@rollup/plugin-commonjs` プラグインが不要となります。


#### HMR Partial Accept (Experimental)

`experimental.hmrPartialAccept` オプションが Experimental 機能として導入されました。

Vite ではフレームワークやツールの作成者向けに HMR 用の API を公開しています。
https://vitejs.dev/guide/api-hmr.html

現状の HMR API の仕組みでは、HMR 可能なモジュールとそうでないモジュールが混在していたファイルの場合、
モジュールを部分的に差し替えることができず、非効率な更新が発生する可能性があります。

参考: [HMR partial accept · Discussion #7309 · vitejs/vite](https://github.com/vitejs/vite/discussions/7309)

新しい API である `import.meta.hot.acceptExports` と組み合わせることで、
export されているモジュールについてより詳細かつ効率的に HMR の制御が可能になります。

### Bundle Size Reduction

Vite 自体のサイズが小さくなりました。30%ほど軽量化されたそうです。

Minify 用の Terser がオプションになったことや、 `node-forge` が `vitejs/plugin-basic-ssl` というプラグインに置き換わったことに起因しているようです。

### Compatibility Notes

- Node.js のサポートバージョンが 14.18+ / 16+ になりました
- Vite 自体が ESM として公開されています。CJS経由で利用する場合は CJS Proxy 経由となります
  - 参考: teppeis/[Vite 3 が採用した CJS Proxy による Dual Package 構成](https://zenn.dev/teppeis/articles/2022-07-npm-dual-pacakge-cjs-proxy)
- サポートブラウザの基準が `"Native ESM"` `"Native ESM dynamic import"` `"import.meta"` の機能をサポートしているブラウザになりました
- SSR および ライブラリモードにおいて、JS の拡張子はフォーマットやパッケージタイプに応じて適切な拡張子が選択されるようになりました

ブラウザバージョンが変わった点は注意が必要になるかもしれません。
Migration Guide によると、主要ブラウザでは次のバージョンがサポート対象になるようです。

- Chrome >=87
- Firefox >=78
- Safari >=13
- Edge >=88

------

というわけで簡単な Vite 3.0 の内容のおさらいでした。

Vite はもともと Native ESM を前提とした仕組みをフル活用していることもあってか、
今回の変更点でも ESM を考慮した変更が多く入った印象を受けます。

個人的には、まだ Experimental ではありますが `Esbuild Deps Optimization at Build Time` にある、
ビルド時にも esbuild を利用可能になる未来が楽しみです。
