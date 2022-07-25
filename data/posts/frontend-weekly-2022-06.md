---
title: "Cybozu Frontend Weekly 2022年6月まとめ"
author: "nus3"
createdAt: "2022-07-25"
summary: "6月にFrontend Weeklyで話したフロントエンドの話題まとめ"
tags:
  - Cybozu
  - FrontendExpert
  - FrontendWeekly
---

フロントエンドエキスパートチームでは、毎週火曜の 17 時に最近のフロントエンド情報を見てワイワイする Cybozu Frontend Weekly を開催しています。

今回は Cybozu Frontend Weekly で 6 月に話した記事をご紹介します。

## 💬 Languages

### [Bringing forward the End-of-Life Date for Node.js 16 | Node.js](https://nodejs.org/en/blog/announcements/nodejs16-eol/)

Node.js v16 の EOL が 当初の予定より 7 ヶ月早まり 2023/9/11 になるとのことです。OpenSSL 1.1.1 側の EOL にあわせるのが理由だそうです。

## 📖 Framework, Library

### [RedwoodJS を Ruby on Rails と比較してみる](https://zenn.dev/mugi/articles/334f9556095a07)

チームの[@mugi_uno](https://twitter.com/mugi_uno) さんが書いてくれた RedwoodJS と Ruby on Rails の比較記事。本人曰く、RedwoodRecord という ORM が Rails の ActiveRecord にかなり近い体験を提供してくれるので感動したらしいです。また、RedwoodJS は RedwoodJS を利用する企業に対してファンドを実施するなど市場拡大に対して精力的なようです。

### [feat: create "@eslint-community GitHub organization" RFC #91](https://github.com/eslint/rfcs/pull/91)

eslint-community org を作って ESLint に関係あるパッケージのメンテナンスをするという提案が進行しているようです。

### [Headless UI v1.6, Tailwind UI team management, Tailwind Play improvements, and more](https://tailwindcss.com/blog/2022-05-23-headless-ui-v1-6-tailwind-ui-team-management)

Tailwind CSS のチームが最近行った活動のまとめです。

- HeadlessUI の 1.6 リリース
- VSCode の Tailwind CSS IntelliSense の拡張に Tailwind CSS language mode が追加
- Tailwind CSS templates が発表予定

### [Vue “vapor” - an experimental, Solid.js-inspired compilation strategy.](https://twitter.com/_jessicasachs/status/1532283507145420801)

`vue/vapor` が Vue Amsterdam で発表されました。SolidJS をベースにしたコンパイルの仕組みとのことです。

### [`lerna/lerna` v5.0.0 Release](https://github.com/lerna/lerna/releases/tag/v5.0.0)

Lerna が Nx にが委譲されてから初のアップデートです。内部処理が Nx に切り替わリました。

### [State of Vuenion](https://docs.google.com/presentation/d/1tPaimqwJEXinPYifwUvA4gLCI6SezZsViuJvieWGAug/edit)

Vue Amsterdam での Evan you の発表資料です。

Vue 2.7 以降での更新内容や、直近リリース予定の Vue 3.3 での変更内容、エコシステムの状況などに加え、Vue の将来向けに検討されている新しいコンパイルの仕組みについてなどが紹介されています。

### [Prettier 2.7](https://prettier.io/blog/2022/06/14/2.7.0.html)

https://twitter.com/PrettierCode/status/1536604535497854977

Prettier 2.7 がリリースされました。
TypeScript 4.7 サポートに加え、高速化のための --cache オプションが追加されたそうです。
チェック高速化に寄与するとのことなので、ぜひ試していきましょう。

### [Apple Music の新しいサイトで Svelte が採用された](https://twitter.com/kevmodrome/status/1534275183334277121?s=20&t=Fm2pmMNFKzMqzQTiUtLQSw)

https://bundlescanner.com/website/beta.music.apple.com%2Fus%2Fbrowse/all  
を見ると、Svelte が採用されているのがわかります。

### [Component Encyclopedia のアップデート](https://storybook.js.org/blog/component-encyclopedia/)

さまざまなプロダクトの StoryBook コンポーネントを見れる Component Encyclopedia がアップデートされました。各コンポーネントの検索機能の追加などが追加されています。

fonts や token といった検索を利用することで、 Design token の参考にできたり、デザインシステムやコンポーネントの見せ方、Storybook の Addon 活用方法なども調べることができ、辞書的に活用できるそうです。

### [Astro 1.0 Release Update | Astro](https://astro.build/blog/astro-1-release-update/)

Astro v1.0.0 のリリースが 7 月下旬ごろになるそうです。パフォーマンス改善や Bugfix などにもう少し時間を費やすとのことです。

## 🖥 Browsers

### [Don't fight the browser preload scanner](https://web.dev/preload-scanner/)

重要なリソースの発見を遅らせるような処理は preload scanner と相性が悪く、かえってパフォーマンスが落ちることがあるので気をつけようねという記事です。

Frontend Weekly 内では、 preload scanner を邪魔しないためにも SSR のような事前に最適化が施されるような処置をした方が良いのかという議論も。SSR を実施したからといって(lazy load 等の)クライアント側の最適化手法をスキップできるわけではないため、必ずしも SSR をすれば解決できる課題ではないという話をしたりしていました。

### [News from WWDC22: WebKit Features in Safari 16 Beta](https://webkit.org/blog/12824/news-from-wwdc-webkit-features-in-safari-16-beta/)

Safari 16 Beta がきますという記事。Container Query や Web Push の実装や sub grid、flex box といったレイアウトのインスペクタが追加されるそうです。

### [IE11 とさよならしたら全力で使える HTML/CSS まとめ【40 個以上】](https://deep-space.blue/web/2263)

IE11 のサポートを考えなかった場合に使えるようになる HTML, CSS のまとめです。position: sticky や object-fit など、必須に近いものが紹介されているので抑えておくと良さそうです。

## 📏 Web Standard

### [A New Definition of HTTP](https://www.mnot.net/blog/2022/06/06/http-core)

HTTP 関連 RFC がどばっと公開されました。

- RFC 9110: HTTP Semantics
- RFC 9111: HTTP Caching
- RFC 9112: HTTP/1.1
- RFC 9113: HTTP/2
- RFC 9114: HTTP/3
- RFC 9163: Expect-CT Extension for HTTP
- RFC 9204: QPACK: Field Compression for HTTP/3
- RFC 9205: Building Protocols with HTTP
- RFC 9209: The Proxy-Status HTTP Response Header Field
- RFC 9211: The Cache-Status HTTP Response Header Field
- RFC 9213: Targeted HTTP Cache Control
- RFC 9218: Extensible Prioritization Scheme for HTTP
- RFC 9220: Bootstrapping WebSockets with HTTP/3
- RFC 9230: Oblivious DNS over HTTPS

各 RFC については[HTTP 関連 RFC が大量に出た話と 3 行まとめ](https://blog.jxck.io/entries/2022-06-16/HTTP-RFCs.html)で概要が紹介されています。

なお、RFC 公開を祝い HTTP RFC Publication Study という、
複数人の方で内容のキャッチアップを行うイベントが行われ、その動画が YouTube 上にアーカイブとして残っています。
https://www.youtube.com/watch?v=_hfG0HCufbs

### [Web 技術解体新書「第二章 Cache 解体新書」リリース](https://zenn.dev/jxck/books/cache-anatomia)

Web における Caching の概念を `Cache-Control` だけでなく関連するあらゆる仕様の側面から解説した Zenn book がリリースされました。

## 🎨 Design

### [The Surprising Truth About Pixels and Accessibility](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/)

px と rem/em どっち使う？という話。
フォントは rem 等を使って padding なんかは px でいいよね(場合による)、みたいな話でした。

px と rem のマッピングを良い感じにするために body のフォントサイズに 62.5% を設定するのは良くないよという話が印象的でした。
(1rem はあくまでユーザが読みやすい標準的なサイズにすべきという思想らしいです)

### [Roboto … But Make It Flex](https://material.io/blog/roboto-flex)

Google Fonts に Roboto Flex という新しい Variable Fonts が追加されました。

### [Building a button component](https://web.dev/building-a-button-component/)

ダークモード・ライトモードや a11y を意識したボタンコンポーネントの作り方の紹介です。`:is` を利用した `:hover`, `:focus` の一括設定や、 outline-offset を利用したフォーカス時のスタイル制御など、実際にすぐ現場で使えそうな例も多かったです。

### [Customizing Color Fonts on the Web](https://webkit.org/blog/12662/customizing-color-fonts-on-the-web/)

@font-palette-values が Safari 15.4 以降でサポートされたカラーフォントに関しての記事です。カラーパレットの Override 方法や、実際に適用するときの指定方法などが紹介されています。
