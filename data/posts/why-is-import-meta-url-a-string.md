---
title: "なぜ import.meta.url は URL オブジェクトではなく文字列なのか"
author: "sosukesuzuki"
createdAt: "2022-07-26"
summary: "なぜ import.meta.url は URL オブジェクトではなく文字列なのか"
tags:
  - ECMAScript
  - HTML
  - URL
---

数多くの Node.js ライブラリの作者として知られる Sindre Sorhus 氏が次のようなツイートをしていた。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Why is `import.meta.url` a string and not a `URL` instance?</p>&mdash; Sindre Sorhus 💙💛 (@sindresorhus) <a href="https://twitter.com/sindresorhus/status/1551202763383644161?ref_src=twsrc%5Etfw">July 24, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

これを見て私も理由が気になったので調査してみた。

## 先にまとめ

URL の仕様にそうすべきと書いてあるから。

## 普通に考えると？

まず最初に思いつくであろうものが「`import.meta.url`はECMAScriptの仕様だが、`URL`オブジェクトはHTMLの仕様に含まれるため、仕様間のそういった参照はできない」という理由である。

実際 Twitter 上ではそのように考えている人もいた。

しかし、それは誤りである。

[ECMAScriptの`import.meta`の Runtime Semantics](https://tc39.es/ecma262/#sec-meta-properties-runtime-semantics-evaluation) を見れば明らかだが、ECMAScript の仕様の範囲内では `import.meta` はオブジェクトであることくらいしか定められていない。どのようなプロパティが提供されるかは各ホストに委ねられている。

たとえば HTML や Node.js などの主要なホストでは、(ECMAScriptの立場から見れば偶然)同じ `import.meta.url` というプロパティが実装されているということになる。
つまり、`import.meta.url` は ECMAScript には含まれていない。

最近では Vite などのモジュールバンドラーが `import.meta` に独自のプロパティを実装しているが、それも ECMAScript の仕様としてはなんの問題もない。

もちろん、[HTML の `import.meta.url` は HTML の仕様に定めらている。](https://html.spec.whatwg.org/multipage/webappapis.html#hostgetimportmetaproperties)

## 実際には

https://github.com/tc39/proposal-import-meta に起票された issue に答えが書いてあった。

[`import.meta.url` as URL instead of string](https://github.com/tc39/proposal-import-meta/issues/13:embed)

この issue はズバリ「`import.meta.url` は文字列ではなく `URL` オブジェクトであるべきでは？」という趣旨のものだ。

それに対して Domenic Denicola 氏が [WHATWG の URL の仕様を参照して](https://url.spec.whatwg.org/#url-apis-elsewhere)回答している。

参照された URL の仕様を読むと次のように書かれている。

> A standard that exposes URLs, should expose the URL as a string (by serializing an internal URL). A standard should not expose a URL using a URL object. URL objects are meant for URL manipulation.

要約すると「`URL` オブジェクトは URL を操作するためのものなので、標準が URL を公開するときは `URL` オブジェクトではなく文字列として公開するべきである。」ということである。

つまり、`import.meta.url` が文字列として提供されている理由は、**URL の仕様に「URL を提供するときは `URL` オブジェクトではなく文字列として提供するべき」と記述されているから**ということになる。

## 最後に

なぜ URL の仕様にそのような記述があるのか、という根本的な理由はわからなかった。

仕様によれば

> URL objects are meant for URL manipulation.

とのことなので、単純に用途と異なるからということなのだろうが、直感的には「別に `URL` オブジェクトとして提供されていてもいいんじゃなかろうか」とも思う。

より詳しい背景を知っている人がいたら教えてほしい。

## 参考リンク

- TC39
  - [tc39/proposal-import-meta: import.meta proposal for JavaScript](https://github.com/tc39/proposal-import-meta)
  - [Issues · tc39/proposal-import-meta](https://github.com/tc39/proposal-import-meta/issues/13)
- WHATWG
  - [URL Standard](https://url.spec.whatwg.org/)
  - [HTML Standard](https://html.spec.whatwg.org/)
