---
title: "フロントエンドのモノレポ構成はスケーリングの夢を見るか"
author: "nus3"
editor:
  - "nakajmg"
createdAt: "2022-01-31"
summary: "Turborepoのstarterでできるモノレポ構成からスケーリングするフロントエンドの構成について考える"
tags:
  - Monorepo
  - Turborepo
---

それっぽいタイトルを付けましたが特に意味はないです。

[workspace を使ったコマンドを最適化して実行する Turborepo について](https://cybozu.github.io/frontend-expert/posts/turborepo)のお話で Turborepo を軽く触ってみた際に`npx create-turbo@latest`で作られる構成がとてもわかりやすく、プロダクトの初期段階からモノレポを採用するのは選択肢の 1 つとしていいのでは、と思い続編を書きました。

前回と同じくサンプルのリポジトリはこちらになります。  
https://github.com/nus3/p-turborepo/tree/main/yarn

## 概要

- モノレポを採用することで、同一リポジトリ内で自作した汎用的なライブラリやコンポーネントを複数のアプリケーションで使いまわせる
- 規模が大きくなってきた場合にモノレポ内のパッケージを npm に公開することで、アプリケーションとパッケージを非同期に開発できる
- Yarn や npm の workspace はイイゾ！

## モノレポとは

モノレポとは本記事では npm や Yarn の workspaces 機能を使い、1 つのリポジトリ内で複数の npm パッケージを管理している構成のこととします。

### npm や Yarn の workspaces

npm や Yarn の workspaces は 1 つのリポジトリ内で複数の npm パッケージを管理するための機能です。

- [Yarn(v1)](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [Yarn(v2 以降)](https://yarnpkg.com/features/workspaces)
- [npm](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

workspaces を使うにはリポジトリのルート直下にある`package.json`に`workspaces`を追加します。

例えば`apps`配下にアプリケーションの npm パッケージを、`packages`配下に汎用的なコンポーネント、ライブラリなどの npm パッケージを入れる場合、次のようになります。

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

apps 配下にある`nus3-a`というアプリケーションから packages 配下にある`nus3-ui`という名前の npm パッケージを使う場合、それぞれ次のような`package.json`になります。

`apps/nus3-a`

```json
{
  "name": "nus3-a",
  "version": "0.0.0",
  "dependencies": {
    "nus3-ui": "*"
    // Yarnのv2以降であれば`workspace:`構文が使えるようになる
    // REF: (nus3) https://yarnpkg.com/features/workspaces#workspace-ranges-workspace
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

workspaces 内にある npm パッケージの名前が npm に公開されているパッケージ名と同じ場合は、 workspace 内の npm パッケージが優先してインストールされます。後々 workspaces 内の npm パッケージを公開する可能性がある場合、パッケージ名は npm で公開されているパッケージ名と被らない名前にした方が良いかもしれません。

workspace 内の npm パッケージを依存関係に追加すると node_modules にシンボリックリンクが作成されます。次の画像のように node_modules 配下に`nus3-ui`と`nus3-a`のシンボリックリンクが追加されていることが確認できます。

![node_modulesに作成されたシンボリックリンク](/frontend-expert/image/considerations-for-monorepo/symlink.png)

シンボリックリンクにより依存する npm パッケージのコードを直接参照するので、npm に公開しバージョン管理するまでは、version は`0.0.0`、かつ、使う側は`"nus3-ui": "*"`のようにワイルドカードを指定するとバージョンのことを意識せずに管理できます。

### create-turbo で作られるモノレポ構成

create-turbo(`npx create-turbo@latest`) では作られるモノレポ構成に次のようなものが含まれます。

- npm に公開せずに config をモノレポ内の別パッケージに分けて、複数のパッケージから使用する
- React を使った汎用的なコンポーネント(tsx)を別パッケージに分けて アプリケーション(Next.js)で使用する

それぞれ見ていきましょう。

#### npm に公開せずに config をモノレポ内の別パッケージに分けて、複数のパッケージから使用する

ESLint や Stylelint の config は npm に公開することで、異なるプロジェクトで共通の設定を使えます。サイボウズでは[@cybozu/eslint-config](https://github.com/cybozu/eslint-config)や[@cybozu/stylelint-config](https://github.com/cybozu/stylelint-config)として npm に公開しています。

モノレポ内であれば ESLint や Stylelint の設定を npm に公開・管理せずに共有することもできます。

`packages/nus3-config`  
で共通の ESLint や TSConfig を定義して、package.json の`files` に指定します。

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
で`nus3-config`を追加し、`nus3-config`から TSConfig や ESLint のルールを適用します。

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

`apps/nus3-a/tsconfig.json`

```json
{
  "extends": "nus3-config/tsconfig.nextjs.json"
}
```

`apps/nus3-a/.eslintrc`

```js
module.exports = require("nus3-config/eslint-preset");
```

#### React を使った汎用的なコンポーネント(tsx)を別パッケージに分けて アプリケーション(Next.js)で使用する

create-turbo では汎用的な React コンポーネントを tsx ファイルのまま packages 配下の npm パッケージで管理し、Next.js の[plugin](https://github.com/martpie/next-transpile-modules)を使って アプリケーション 側でトランスパイルしています。

`packages/nus3-ui`  
で React(tsx)のコンポーネントを実装します。実装した tsx ファイルのパスをそのまま`main`と`types`に追加します。

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
`nus3-ui`の tsx ファイルを`nus3-a`で`next-transpile-modules`を使ってトランスパイルします。

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

筆者のこれまでの経験では、創業して間もない会社やプロダクトの初期フェーズで、複数のアプリケーションの開発が並列して始まることが多くありました。そういった状況では、モノレポを採用しておくと複数のアプリケーションで共通したコンポーネントやライブラリを少ないコストで使用できます。

また、モノレポ内で共通して使っているパッケージに変更を加える際に、その影響範囲が把握できないくらいモノレポの規模が大きくなった場合には、パッケージを npm に公開してバージョン管理することで、バージョンの変更タイミングを各々のアプリケーションに任せることができ、アプリケーションとパッケージの開発を非同期に行うことができます。

このように、初期段階では汎用的な npm パッケージをアセットとして複数のアプリケーションに提供することで開発スピードを上げられ、また、規模が大きくなってきた場合はパッケージを npm に公開するといった方針をとることもできます。

もちろん、1 つのリポジトリですべてのパッケージを管理することやコードベースが大きく複雑になることなどデメリットもあり、モノレポを採用することが適切ではない場合もあります。メリット・デメリットを踏まえつつ、フロントエンドの技術選定の中にモノレポの採用を選択肢の 1 つとして入れてもいいかもしれません。
