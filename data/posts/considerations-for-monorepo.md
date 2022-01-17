---
title: "フロントエンドのモノレポ構成はスケーリングの夢を見るか"
author: "nus3"
createdAt: "2022-01-17"
summary: "Turborepoのstarterでできるモノレポ構成からスケーリングするフロントエンドの構成について考える"
tags:
  - Turborepo
  - Monorepo
---

それっぽいタイトルを付けましたが特に意味はないです。

[前回](./turborepo)のお話で Turborepo を気軽に触ってみた際に`npx create-turbo@latest`で作られる構成がとてもわかりやすく、プロダクトの初期段階からモノレポを採用する選択肢の一つとしていいのでは、と思い続編を書きました。

## 概要

- モノレポを採用することで、汎用的な package を複数のアプリケーションで使える
- package 単位で切り出せるので疎結合な設計がしやすい
- package が多数のアプリケーションに使われるようになった場合に、モノレポ内から npm registry などへの移行(package の公開)もしやすい
- Yarn や npm の workspace はイイゾ！

## create-turbo で作られるモノレポ構成

`npx create-turbo@latest`を実行すると次のようなモノレポ構成のプロジェクトが作成されます。

(余談ですが turbo コマンドを実行するときにちょくちょく出てくるグラデーション色の文字がおしゃんです)

```
├── apps: application用(Next.js + TypeScript)
│   ├── docs
│   └── web
└── packages:
    ├── config: eslintのconfig
    ├── tsconfig
    └── ui: applicationで使う汎用的なReactコンポーネント
```

モノレポ構成で良さそうだなと思ったものが次になります

- config やコンポーネントなど複数アプリケーションで使いまわせる
- モノレポ内であれば package はトランスパイルせずに使うこともできる
- モノレポ内から npm registry などへの移行(package の公開)もしやすさ

### config やコンポーネントなど複数アプリケーションで使いまわせる

tsconfig も eslint の config も npm などに公開することで複数アプリケーションにそのルールを適応できますが、わざわざ npm へ公開し、バージョン管理するといったことが煩わしく感じる場合もあるかと思います。

モノレポの package 内に config を置くことでバージョン管理や npm への公開といった作業をせずともモノレポ内の複数アプリケーション(別パッケージ)へ config を反映することができます。

`packages/config`の`package.json`

```json
{
  "name": "config",
  "version": "0.0.0",
  "main": "index.js",
  "license": "MIT",
  "files": ["eslint-preset.js"],
  "dependencies": {
    "eslint-config-next": "^12.0.7",
    "eslint-config-prettier": "^8.3.0"
  }
}
```

`packages/config`の`eslint-preset.js`

```js
module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      // REF: (nus3) https://nextjs.org/docs/basic-features/eslint#rootdir
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
```

## 使えそうなユースケース

- 01 フェーズのプロトタイプを作るとき
  - 初回に作った汎用的なコンポーネントを使い回せるので
- smarthr ui のような package の外出し
-
