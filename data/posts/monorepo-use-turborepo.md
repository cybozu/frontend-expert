---
title: "フロントエンドのモノレポ構成はスケールしやすい良い選択なのかもしれない"
author: "nus3"
createdAt: "2022-01-13"
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

- Turborepo は低コストで導入できる
- `npx create-turbo@latest`で作られるモノレポ構成がとてもよかった
- フロントエンドのモノレポの採用はモノレポ内の各 package が疎結合に扱えるのでスケールしやすそう
- モノレポはいいぞ!

## Turborepo

Turborepo はモノレポのためのビルドシステムで次のような特徴があります。

- Yarn, npm の workspaces に対応してるリポジトリに Turborepo 用の設定を少し追加すれば使える
- npm scripts の script 間の関係を定義するだけで、モノレポ内の各 package の script の実行や package 間の依存を最適化してくれる
- ビルド実行後にローカルキャッシュ、リモートキャッシュを生成し、すでにキャッシュがある場合はキャッシュを利用してくれる

## Turborepo で作られる starter のモノレポ構成について

上記の特徴以外にも便利な機能はいくつかあるのですが、今回取り上げたいのはドキュメントの[Getting Started](https://turborepo.org/docs/getting-started)に記載されている starter monorepo についてです。実際に`npx create-turbo@latest`を実行すると次のようになります。

![Turborepoのcreateコマンドを使ったときのキャプチャ](/frontend-expert/image/monorepo-use-turborepo/create-command.png)

(余談ですがグラデーションがおしゃんですよね)

```
├── apps: application用
│   ├── docs
│   └── web
└── packages:
    ├── config
    ├── tsconfig
    └── ui
```
