---
title: "workspaceを使ったコマンドを最適化して実行するTurborepoについて"
author: "nus3"
createdAt: "2022-01-17"
summary: "Turborepoの機能とstarterからでできるモノレポ構成について"
tags:
  - Turborepo
  - Monorepo
---

今年からフロントエンドエキスパートチームでは活動内容の一つである**探求**の一環として、メンバーが気になった技術に対して時間がある人で、気軽に触ってみる会をしています。次の画像は筆者が Slack で、気軽に触ってみる会の開催を宣言してる時のものです。

![slackで気軽に触ってみる会を宣言してる](/frontend-expert/image/monorepo-use-turborepo/slack.png)

今回は[去年の 12 月に Vercel に買収されたニュース](https://vercel.com/blog/vercel-acquires-turborepo)があった Turborepo を気軽に触ってみました。
個人的には 1 人で調べるときよりも複数人でわいわい調べた方が、その技術や関連する周辺知識の話を色んな人の観点で深掘ってできて、とても有意義な時間でした。

## 概要

Turborepo はモノレポのためのビルドシステムで次のような特徴があります。

- Yarn, npm, pnpm の workspaces に対応してるリポジトリに対して簡単に導入できる
- workspace 内のコマンドの依存関係をシンプルに設定してくれる
- Turborepo で実行するコマンドがない package はスルーしてくれる(npm workspace の`--if-present`に相当)
- ローカルキャッシュ、リモートキャッシュを生成・利用できる

### サンプルで作ったモノレポ構成

今回は Yarn v1 の workspace を使ってます。  
https://github.com/nus3/p-turborepo/tree/main/yarn

```
├── apps
│   └── nus3-a: Next.js
└── packages:
    ├── nus3-button2: Reactのコンポーネント + ViteのLibrary Modeでビルド
    ├── nus3-config: tsconfig + eslintのconfig
    └── nus3-ui: Reactのコンポーネント(ビルドせずに使う)
```

サンプルで作ったモノレポ内の package たちは次のような依存関係になっています。  
(色々試してたので適当な命名になってます。すんません)

- `nus3-a`は`nus3-ui`と`nus3-button2`に依存している
- `nus3-ui`は`nus3-button2`に依存している

![サンプルリポジトリの依存関係](/frontend-expert/image/monorepo-use-turborepo/dependencies.png)

### 使い方

1. 使っているパッケージマネージャーで(Yarn, npm, pnpm)で workspace の設定
2. `turbo`のインストール
3. package.json に`pipeline`の設定

#### 1. 使っているパッケージマネージャーで(Yarn, npm, pnpm)で workspace の設定

workspace の設定については割愛します。各パッケージマネージャーのドキュメントをご覧ください。

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [npm](https://docs.npmjs.com/cli/v8/using-npm/workspaces)
- [pnpm](https://pnpm.io/workspaces)

#### 2. `turbo`のインストール

`yarn add turbo -W --dev`で Turborepo を追加します.

#### 3. package.json に`pipeline`の設定

`package.json`に`turbo.pipeline`を追加し、そこで`turbo run {command}`で実行する command の依存関係やキャッシュの設定をします。この`pipeline`で定義した command しか`turbo run {command}`では実行できません。

実際に定義したものが次の json になります。

```json: package.json
{
  "turbo": {
    "pipeline": {
      "build": {
        "dependsOn": ["^build"],
        "outputs": ["dist/**", ".next/**"]
      },
      "test": {
        "dependsOn": ["build"]
      },
      "lint": {},
      "deploy": {
        "dependsOn": ["build", "test", "lint"]
      },
    }
  }
}
```

`dependsOn`で依存関係を、`outputs`でキャッシュするものを指定します。

定義したコマンドを一つずつ見ていきましょう。

```json
"dependsOn": ["^build"],
```

この build コマンドでは dependOn に`^`を追加したコマンド(`^build`)を指定することで workspace 内の各 package の指定したコマンド(`build`)を package 間の依存関係を考慮した順番で実行してくれます。

実際に実行してみると、サンプルで作った各 package の依存関係を考慮した順番(`@nus3/example-button2` → `nus3-ui` → `nus3-a`)でビルドされていることがわかります。

```
$ turbo run build
• Packages in scope: @nus3/example-button2, nus3-a, nus3-config, nus3-ui
• Running build in 4 packages
@nus3/example-button2:build: cache miss, executing a161062b16a0be35
@nus3/example-button2:build: $ vite build && tsc -p ./tsconfig.build.json
...
@nus3/example-button2:build: dist/nus3-example-button2.es.js   3.30 KiB / gzip: 1.39 KiB
nus3-ui:build: cache miss, executing b32d4fb848c8658f
nus3-ui:build: $ echo 'build nus3-ui'
...
nus3-a:build: cache miss, executing a80d8842624981a8
nus3-a:build: $ next build
...

 Tasks:    3 successful, 3 total
Cached:    0 cached, 3 total
  Time:    5.702s
```

次の`outputs`はコマンドを実行した際に、`dist`と`.next`配下にあるファイル群をキャッシュする設定です。`node_modules/.cache/turbo`にキャッシュしたファイルが出力されます。

```json
"outputs": ["dist/**", ".next/**"]
```

先程の build コマンドをもう一度実行すると cache が使われ、前回より早く実行されているのがわかります。

```
$ turbo run build
• Packages in scope: @nus3/example-button2, nus3-a, nus3-config, nus3-ui
• Running build in 4 packages
@nus3/example-button2:build: cache hit, replaying output a161062b16a0be35
...
nus3-ui:build: cache hit, replaying output b32d4fb848c8658f
...
nus3-a:build: cache hit, replaying output a80d8842624981a8
...

 Tasks:    3 successful, 3 total
Cached:    3 cached, 3 total
  Time:    221ms >>> FULL TURBO

✨  Done in 0.57s.

```

次のように何も指定しない場合、依存関係がないものとして認識され並列に実行されます

```json
"lint": {},
```

次の deploy コマンドの`dependsOn`では pipeline で定義した`build`, `test`, `lint`を実行し、終了した時点で workspace 内の各 package の`deploy`コマンドを実行します。

```json
"deploy": {
  "dependsOn": ["build", "test", "lint"]
},
```

今回定義したものの場合、次のようなことを考慮しながら各々の package のコマンドを実行します。

- `build`: 各 package の依存順を考慮しつつ build
- `test`: `pipeline`で定義した`build`が実行された後に実行
- `lint`: 他のコマンドの順番を気にせず、並列で実行

deploy コマンドを実行した結果が次になります。

```
$ turbo run deploy
• Packages in scope: @nus3/example-button2, nus3-a, nus3-config, nus3-ui
• Running deploy in 4 packages
nus3-a:lint: $ next lint
@nus3/example-button2:build: $ vite build &amp;&amp; tsc -p ./tsconfig.build.json
...
nus3-ui:build: $ echo 'build nus3-ui'
...
nus3-a:build: $ next build
...
nus3-a:test: $ echo 'test nus3-a'
...
nus3-a:deploy: $ echo 'deploy nus3-a'
```

実際に上記を考慮しつつ各 package のコマンドが実行された後に、最後に deploy コマンドが実行されているのがわかると思います。

また、今回はローカルキャッシュの話のみでしたが、Turborepo には[Vercel](https://turborepo.org/docs/features/remote-caching#vercel)や[独自](https://turborepo.org/docs/features/remote-caching#custom-remote-caches)にキャッシュを配置することで、同じハッシュのキャッシュがあった場合にそのキャッシュを使ってくれる**リモートキャッシュ**といった機能も Beta で用意されています。

今のプロジェクトが Yarn や npm の workspace を使っているのであれば、Turborepo を試しに入れてみてもいいかもしれません。
