---
title: "サイボウズ フロントエンドエキスパートチームの活動 2022年上期"
author: "nakajmg"
createdAt: "2022-07-12"
summary: "サイボウズのフロントエンドエキスパートチームの2022年の上期の活動内容を紹介します。"
tags:
  - Cybozu
  - FrontendExpert
---

サイボウズ フロントエンドエキスパートチームの 2022 年上期（１月〜6 月）の取り組みを紹介します。

## プロダクトへの支援

プロダクト支援としておもに次の 2 つを行いました。

- kintone のフロントエンドリアーキテクチャ
- サイボウズ製品の販売管理システムのフロントエンドリアーキテクチャ

これらの支援活動は現在（2022 年 7 月〜）も継続中です。

### kintone のフロントエンドリアーキテクチャ

kintone のフロントエンドリアーキテクチャプロジェクト、通称フロリアへの支援を昨年から引き続いて行っています。メンバーはプロジェクトのチームに所属する形で支援活動をしています。

フロリアの詳細については次の記事を参照ください。

[](https://blog.cybozu.io/entry/2021/07/20/170000:embed)

次の記事はメンバーによる活動のアウトプットです。

[](https://blog.cybozu.io/entry/2022/03/18/100000:embed)

[](https://blog.cybozu.io/entry/2022/04/14/110000:embed)

また、直接的な支援ではありませんが、フロリアプロジェクトでの社外アウトプット（社の技術ブログへの執筆）を支援する活動も行っています。

### サイボウズ製品の販売管理システムのフロントエンドリアーキテクチャ

kintone をはじめとした、サイボウズの製品をお客様に購入していただくときに使われるサービスがあります。

販売管理システムは kintone と同じく Closure で構築された歴史のあるサービスです。このサービスに関しても、継続性の観点からフロントエンドの再構築を進めています。

## 社内への情報共有と相談

社内への Web フロントエンドの情報共有として Frontend Weekly を継続して開催しています。

また、チームの相談窓口に来たほかチームからの相談に対して調査や支援を行っています。

上期には次のような相談がありました。

- 自社で提供している OSS ライブラリの特定フレームワークでの利用方法を説明したドキュメントのレビュー
- Jest v28 へのアップデート方法
- Dual Package の package を esbuild で利用する際のエラー
- コンポーネントのスタイリング方法について教えてほしい

### 新人研修のコンテンツ作成と講義の実施

社内向け新人研修のコンテンツとして「サイボウズの Web フロントエンドについて」というタイトルで研修資料を作成し、講義を行いました。

サイボウズ社内の各プロダクトの現状確認とこれから向かう先を、レガシーフロントエンドとモダンフロントエンドの差異を交えながら解説するといった内容になっています。

サイボウズの各プロダクトにはまだまだ課題がある状態ですので、現状を認識してもらったうえで未来に向けてどう解決していくかの足がかりにするとともに、やっていきを高められたかなと思います。

### 社内で IE 卒業式を実施

サイボウズは 2022/06/12 に IE 11 のサポートを終了しました。

公開イベントとして開催された[IE 卒業式](https://web-study.connpass.com/event/250191/)の社内版として、チームを問わず社内から IE に関する LT をしてくれるメンバーを募集して LT 会を開催しました。

社内向けならではの IE の思い出話が聞けた有意義な会となりました。

## 社外への発信

### Frontend Monthly

社外への発信として YouTube Live にて月イチで Frontend Monthly を 生配信・録画で開催しています。

- [Cybozu Frontend Monthly#19 - connpass](https://cybozu.connpass.com/event/236989/)
- [Cybozu Frontend Monthly#20 - connpass](https://cybozu.connpass.com/event/239952/)
- [Cybozu Frontend Monthly#21 (ゲスト：株式会社ログラス) - connpass](https://cybozu.connpass.com/event/241837/)
- [Cybozu Frontend Monthly#22 - connpass](https://cybozu.connpass.com/event/246037/)
- [Cybozu Frontend Monthly#23 - connpass](https://cybozu.connpass.com/event/248124/)
- [Cybozu Frontend Monthly#24 (ゲスト：LAPRAS 株式会社) - connpass](https://cybozu.connpass.com/event/250296/)

ゲストとして参加して頂いた方々ありがとうございました。

### チームのブログ

また、当ブログにてブラウザの更新情報や ECMAScript の最新動向などを発信しています。

- [workspace を使ったコマンドを最適化して実行する Turborepo について](https://cybozu.github.io/frontend-expert/posts/turborepo)
- [CSS color-scheme サポート追加等 Firefox 96.0 リリースノートまとめ](https://cybozu.github.io/frontend-expert/posts/release-firefox-96)
- [Web Transport のサポートなど、Chrome 97 リリースノートまとめ](https://cybozu.github.io/frontend-expert/posts/release-chrome-97)
- [ECMAScript の最新動向 2021 年 12 月版](https://cybozu.github.io/frontend-expert/posts/tc39-meeting-2021-12)
- [フロントエンドのモノレポ構成はスケーリングの夢を見るか](https://cybozu.github.io/frontend-expert/posts/considerations-for-monorepo)
- [COLRv1 font のサポートなど、Chrome 98 リリースノートまとめ](https://cybozu.github.io/frontend-expert/posts/release-chrome-98)
- [ECMAScript の最新動向 2022 年 01 月版](https://cybozu.github.io/frontend-expert/posts/tc39-meeting-2022-01)
- [主要ブラウザで使える！CSS Cascade Layers で新しい CSS 設計の手法を考える](https://cybozu.github.io/frontend-expert/posts/css-cascade-layers)
- [CSS Cascasde Layers の追加など、Chrome 99 リリースノートまとめ](https://cybozu.github.io/frontend-expert/posts/release-chrome-99)
- [Safari 15.4 リリースノートまとめ | dialog Element や lazy-loading, CSS Cascade Layers サポートなど](https://cybozu.github.io/frontend-expert/posts/release-safari-15-4)
- [Chrome 101 リリースノートまとめ](https://cybozu.github.io/frontend-expert/posts/release-chrome-101)
- [ECMAScript の最新動向 2022 年 03 月版](https://cybozu.github.io/frontend-expert/posts/tc39-meeting-2022-03)

## 探究活動

フロントエンドエキスパートチームでは支援・発信・啓蒙のほかに探究も業務の一環として行っています。

今年の 4 月からは新たな取り組みとして「フロントエンドお触り会」を実施しています。

この会はメンバーが気になっている技術をワイワイ触ってみる集まりです。不定期に誰かが思い立った日に開催されます。

次のようなものについてワイワイと試していました。

- Remix
- Playwright を使ったコンポーネントテスト
- Rome

下期はもう少し開催頻度を上げて、いろいろなものを触りたいです。

## おわりに

2022 年下期も引き続き支援活動、発信を続けていきたいと思います。

フロントエンドエキスパートチームではサイボウズのフロントエンドを最高にするメンバーを募集しています。採用サイトからの応募、Meety でのカジュアル面談などお待ちしております。

[](https://cybozu.co.jp/recruit/entry/career/front-end-expert.html:embed)

[](https://meety.net/matches/tJBtUYfxlxrv:embed)
