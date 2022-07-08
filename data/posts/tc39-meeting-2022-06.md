---
title: "ECMAScriptの最新動向 2022年06月版"
author: "sosukesuzuki"
createdAt: "2022-07-07"
summary: "2022年06月06日~09日に開催された TC39 meeting 90th の内容を紹介します"
tags:
  - TC39
  - ECMAScript
---

## For Stage 4

### [`findLast` / `findLastIndex`](https://github.com/tc39/proposal-array-find-from-last/)

**Stage 4 に到達しました**

`findLast` は `findLastIndex` は、`Array.prototype.find` と `Array.prototype.findLastIndex` の逆から捜査するバージョンです。

```js
const arr = [
  { prop1: 1, prop2: "foo" },
  { prop1: 1, props2: "bar" },
];
const obj1 = arr.find((element) => element.prop1 === 1);
console.log(obj1.prop2); // "foo"
const obj2 = arr.findLast((element) => element.prop1 === 1);
console.log(obj2.props); // "bar"
```

このミーティングの時点で V8、JavaScriptCore(フラグ付き)、ChakraCore(フラグ付き) にはすでに実装されており、[SpiderMonkey でも後日実装されたようです](https://spidermonkey.dev/blog/2022/06/30/newsletter-firefox-102-103.html)。

(余談ですが筆者は、このプロポーザルのスライド資料を読んで ChakraCore の開発が未だに継続されていることと TC39 プロセスにおける実装の一つとして数えられていることをはじめて知りました。)

## For Stage 3

### [Symbols as WeakMap keys](https://github.com/tc39/proposal-symbols-as-weakmap-keys)

**Stage 3 に到達しました**

Symbols as WeakMap keys は WeakMap のキーとして Symbol を使えるようにするプロポーザルです。

提案の概要については

[JavaScript の Symbols as WeakMap keys について](https://sosukesuzuki.dev/posts/symbols-as-weakmap-keys:embed)

を見てください。

これまでの流れについては

[ECMAScript の最新動向 2022 年 01 月版](https://cybozu.github.io/frontend-expert/posts/tc39-meeting-2022-01:embed)

を見てください。

Symbols as WeakMap keys が一見シンプルながらこれまで Stage 2 のままだったのは、グローバルシンボルレジストリに登録された symbol や well-known symbols などのいわゆる eternal symbol を WeakMap のキーとして許容するかどうか、という論点のためでした。

まだ議事録が公開されていないため今回のミーティングでどのような議論が行われたのかはわかりませんが、スライド( http://www.rricard.me/serve/tc39-jun2022-symbols-as-wm-keys.pdf ) 上では次のように書かれています。

- 通常の Symbol コンストラクタで作られる unique symbols は WeakMap のキーとして許容する
- `Symbol.for("...")` で作られるグローバルシンボルレジストリに登録された registered symbols は WeakMap のキーとして許容しない
- well-known symbols は WeakMap のキーとして許容する

実際 https://tc39.es/proposal-symbols-as-weakmap-keys/ を見る限り WeakMap のキーとして妥当かどうかを判断するために使われている abstract operation [`CanBeHeldWeakly`](https://tc39.es/proposal-symbols-as-weakmap-keys/#sec-canbeheldweakly-abstract-operation) では registerd symbols を許容していないようです。

### [RegExp Modifiers](https://github.com/tc39/proposal-regexp-modifiers)

**Stage 3 に到達しました**

RegExp Modifiers は正規表現パターンの中でのフラグの変更を可能にするプロポーザルです。

概要については 2021 年 12 月の記事を見てください。

[ECMAScript の最新動向 2021 年 12 月版](https://cybozu.github.io/frontend-expert/posts/tc39-meeting-2021-12:embed)

### [`JSON.parse` source text access](https://github.com/tc39/proposal-json-parse-with-source)

## For Stage 2

### [`String.dedent`](https://github.com/tc39/proposal-string-dedent)

### [Grouped and Auto-Accessors](https://github.com/tc39/proposal-grouped-and-auto-accessors)

## For Stage 1

### [Duplicate named capture groups](https://github.com/bakkot/proposal-duplicate-named-capturing-groups)

### [`this` parameter](https://github.com/hax/proposal-this-parameter)

### [RegExp Atomic Operators](https://github.com/rbuckton/proposal-regexp-atomic-operators)

## Updates

### [Array Grouping](https://github.com/tc39/proposal-array-grouping)

Array Grouping は [Lodash の `groupBy`](https://lodash.com/docs/4.17.15#groupBy) のように配列をグルーピングするメソッドを導入するプロポーザルです。

今回の変更で `groupBy` と `groupByToMap` から `group` と `groupToMap` へとメソッドの名前が変更されました。

詳細は該当の Pull Request( https://github.com/tc39/proposal-array-grouping/pull/39 )を見てください。

### [Decorators](https://github.com/tc39/proposal-decorators)

### [Shadow Realms](https://github.com/tc39/proposal-shadowrealm)

### [Temporal](https://tc39.es/proposal-temporal/)

### [`function.sent`](https://github.com/tc39/proposal-function.sent)

### [Import Reflection](https://github.com/tc39/proposal-import-reflection)

## 参考リンク

- TC39
  - [agendas/06.md at main · tc39/agendas](https://github.com/tc39/agendas/blob/main/2022/06.md)
- Babel
  - [Jun 2022 · Issue #82 · babel/proposals](https://github.com/babel/proposals/issues/82)
- SpiderMonkey
  - [SpiderMonkey Newsletter (Firefox 102-103) | SpiderMonkey JavaScript/WebAssembly Engine](https://spidermonkey.dev/blog/2022/06/30/newsletter-firefox-102-103.html)
