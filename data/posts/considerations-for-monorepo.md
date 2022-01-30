---
title: "フロントエンドのモノレポ構成はスケーリングの夢を見るか"
author: "nus3"
createdAt: "2022-01-31"
summary: "Turborepoのstarterでできるモノレポ構成からスケーリングするフロントエンドの構成について考える"
tags:
  - Monorepo
  - Turborepo
---

それっぽいタイトルを付けましたが特に意味はないです。

[workspace を使ったコマンドを最適化して実行する Turborepo について](./turborepo)のお話で Turborepo を気軽に触ってみた際に`npx create-turbo@latest`で作られる構成がとてもわかりやすく、プロダクトの初期段階からモノレポを採用するのは選択肢の 1 つとしていいのでは、と思い続編を書きました。

## 概要

- モノレポを採用することで、汎用的なパッケージを複数のアプリケーションで使える
- モノレポ内のパッケージは npm registry などへの移行(パッケージの公開)もできる
- Yarn や npm の workspace はイイゾ！

## モノレポとは

モノレポとは本記事では npm や Yarn の workspaces 機能を使い、1 つのリポジトリ内で複数の npm パッケージを管理している構成として扱います。

### npm や Yarn の workspaces

npm や Yarn の workspaces は 1 つのリポジトリ内で複数の npm パッケージを管理するための機能です。

- [Yarn(v1)](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [Yarn(v2 以降)](https://yarnpkg.com/features/workspaces)
- [npm](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

リポジトリのルート直下にある`package.json`に`workspaces`を追加します。

ディレクトリ名は任意の名前でいいが、例えば`apps`配下にアプリケーションの npm パッケージを、`packages`配下に汎用的なコンポーネント、関数などの npm パッケージを入れる場合、次のようになります。

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

`nus3-a`というアプリケーションから packages 配下にある`nus3-ui`という名前の npm パッケージを使う場合、それぞれ次のような`package.json`になります。

`apps/nus3-a`

```json
{
  "name": "nus3-a",
  "version": "0.0.0",
  "dependencies": {
    "nus3-ui": "*"
    // Yarnのv2以降であれば`workspace:`構文が使えるようになる
    // "nus3-ui": "workspace:*"
  }
}
```

`packages/nus3-ui`

```json
{
  "name": "nus3-ui",
  "version": "0.0.0"
}
```

workspaces 内にある npm パッケージを依存関係に追加すると、例え npm に公開されているパッケージ名と同じものであろうと workspace 内の npm パッケージが優先してインストールされます。後述しますが、後々 workspace 内の npm パッケージを公開する可能性がある場合、パッケージ名は npm で公開されているパッケージ名と被らない命名をした方が良いかもしれません。

workspace 内の npm パッケージを依存関係に追加すると node_modules にシンボリックリンクが作成されます。

![node_modulesにシンボリックリンクが作成される](/frontend-expert/image/considerations-for-monorepo/symlink.png)

シンボリックリンクにより依存する npm パッケージのコードを直接見るので、npm に公開するなどバージョン管理するフェーズになるまでは、version は`0.0.0`、かつ、使う側は`"nus3-ui": "*"`のようにワイルドカードを指定するとバージョンのことを意識せずに管理できます。

### create-turbo で作られるモノレポ構成

次のようなテクニックが create-turbo で作られるモノレポ構成に含まれます。

- eslint や tsconfig などの汎用的な config をモノレポ内の別パッケージに分けて複数の別パッケージから使用する
- React を使った汎用的なコンポーネント(tsx)を別パッケージに分けて アプリケーション(Next.js)で使用する

それぞれ見ていきましょう。

#### npm に公開せずに config をモノレポ内の別パッケージに分けて、複数の別パッケージから使用する

もちろん ESLint や Stylelint は npm に公開することにより、共通の設定を各プロジェクトで使えるようになっています。サイボウズでは[ESLint](https://github.com/cybozu/eslint-config)や[Stylelint](https://github.com/cybozu/stylelint-config)は npm に公開しています。

npm に公開・管理するのが面倒な場合は、モノレポ内であれば npm に公開することなく共有することもできます。

`packages/nus3-config`  
で共通の ESLint や TSConfig を定義して、files に指定します。

```json
{
  "name": "nus3-config",
  "version": "0.0.0",
  "files": [
    "eslint-preset.js",
    "tsconfig.base.json",
    "tsconfig.nextjs.json",
    "tsconfig.react-library.json"
  ]
}
```

`apps/nus3-a`
で`nus3-config`を追加し、`nus3-config`から TSConfig や ESLint のルールを適応します。

```json
{
  "name": "nus3-a",
  "version": "0.0.0",
  "devDependencies": {
    "eslint": "8.6.0",
    "nus3-config": "*"
  }
}
```

```json
{
  "extends": "nus3-config/tsconfig.nextjs.json"
}
```

```js
module.exports = require("nus3-config/eslint-preset");
```

#### 汎用的なコンポーネントを別パッケージに分けて アプリケーション で使用する

create-turbo では用的な React コンポーネントを tsx ファイルのまま packages 配下の npm パッケージで管理し、Next.js の[plugin](https://github.com/martpie/next-transpile-modules)を使って アプリケーション 側でトランスパイルしています。

`packages/nus3-ui`  
で React(tsx)のコンポーネントを実装。tsx ファイルをそのまま`main`と`types`に追加する。

```json
{
  "name": "nus3-ui",
  "version": "0.0.0",
  "main": "./index.tsx",
  "types": "./index.tsx",
  "devDependencies": {
    "@types/react": "17.0.37",
    "@types/react-dom": "17.0.11",
    "typescript": "4.5.4"
  }
}
```

`packages/nus3-ui/index.tsx`

```tsx
import { VFC } from "react";

export const Button: VFC = () => {
  return <button>ボタン</button>;
};
```

`apps/nus3-a`  
で`nus3-ui`の tsx ファイルをトランスパイルしている

```json
{
  "name": "nus3-a",
  "version": "0.0.0",
  "devDependencies": {
    "next-transpile-modules": "9.0.0"
  }
}
```

`apps/nus3-a/next.config.js`

```js
const withTM = require("next-transpile-modules")(["nus3-ui"]);
module.exports = withTM({});
```

## フロントエンドのモノレポ戦略

これまでの筆者が経験では、会社やプロダクトの初期段階でフロントエンドにモノレポを採用するといったことはあまりありませんでした。しかし、改めてフロントエンドのモノレポをまとめてみて、最初のプロダクトを作るときにモノレポを採用するのはありなのかもしれないと感じました。

01 フェーズの会社では、前のプロダクトで作ったコンポーネントを新しいプロダクトでも使いたいといったことがあると思います。

また、モノレポ内で影響範囲が追えなくなるぐらい色々なアプリケーションで使われるようになった汎用的な npm パッケージが出てきたら、npm registry に公開・バージョン管理することでバージョンアップのタイミングを各々のアプリケーションに任せることができ、アプリケーションとパッケージの開発を非同期に行うことができます。

このように、初期段階では汎用的な npm パッケージをアセットとして複数のアプリケーションに提供することで開発スピードを上げられ、また、規模が大きくなってきた場合はパッケージを npm に公開するといった方針をとることもできます。

もちろん、1 つのリポジトリですべての package のプルリクを管理することやコードベースが大きく複雑になることなどデメリットもあり、モノレポを採用することが適切ではない場合もありますが、今回紹介したモノレポの概要も踏まえ、技術選定の選択肢の 1 つにモノレポを入れるのはいかがでしょうか。
