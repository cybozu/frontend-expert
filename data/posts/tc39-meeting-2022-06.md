---
title: "ECMAScriptの最新動向 2022年06月版"
author: "sosukesuzuki"
createdAt: "2022-07-07"
summary: "2022年06月06日~09日に開催された TC39 meeting 90th の内容を紹介します"
tags:
  - TC39
  - ECMAScript
---

この記事では2022年06月06日~09日に開催された TC39 meeting 90th で議題に上がったプロポーザルを紹介します。

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

**仕様のテキストの修正を待って条件付き Stage 3 にるようです**
(2022年6月のミーティングの議事録はまだ公開されていないので詳細は不明です。)

`JSON.parse` source text access は、`JSON.parser` の第２引数として渡すことができる関数(reviver)の中でもとのテキストにアクセスできるようにするためのプロポーザルです。

reviver ではパースした JSON のそれぞれのメンバーのキーとバリューにアクセスし、結果のオブジェクトを返す前になんらかの変換を施すことができます。


```js
const obj = JSON.parse(`{ "foo": 3 }`, (key, value) => {
  if (typeof value === "number") {
    return value + 2;
  }
  return value;
});
console.log(obj);
// { "foo": 5 }
```

この reviver の引数としてキーとバリューが渡ってきた時点ですでにもとのテキストには存在する情報が失われていることがあります。

たとえば `{ "key": 999999999999999999 }` という JSON を `JSON.parse` でパースするときに、reviver で受け取った引数をそのまま出力する例を考えてみましょう。

```js
JSON.parse(`{ "key": 999999999999999999 }`, (key, value) => {
  console.log(value);
  return value;
});
// 1000000000000000000
```

もとの値は `999999999999999999` なのに実際に出力された値は `1000000000000000000` になっています。つまり、reviver の引数として受け取った時点でですでに `999999999999999999` ではなく `1000000000000000000` になってしまっています。

なので、渡されたメンバーのバリューが `999999999999999999` なのかそれとも `1000000000000000000` なのか、reviver 側からは判断ができません。

これでは困るので `JSON.parse` source text access では、次のようなインターフェースでもとのソーステキストにアクセスできます。

```js
JSON.parse(
  `{ "key": 999999999999999999 }`,
  (key, value, { source }) => {
  　　// ここで source には '999999999999999999' という文字列が入ってる
    ...
  }
);
```

## For Stage 2

### [`String.dedent`](https://github.com/tc39/proposal-string-dedent)

**Stage 2 に到達しました**

`String.dedent` はテンプレートリテラルの内部のインデントを適切に除去するためのタグ付きテンプレートリテラルを追加するプロポーザルです。

```js
class MyClass {
  print() {
    console.log(`
      create table student(
        id int primary key,
        name text
      )
    `);
  }
}
```

このようなコードを書くと、実際に出力される文字列には、通常プログラマーが期待するものとは異なるスペースが含まれることになります。

```js
const instance = new MyClass();
instance.print();

/*

      create table student(
        id int primary key,
        name text
      )
    
*/
```

こういうときのために適切にインデントを取り除いてくれるのが `String.dedent` です。

```js
class MyClass {
  print() {
    console.log(String.dedent`
      create table student(
        id int primary key,
        name text
      )
    `);
  }
}
const instance = new MyClass();
instance.print();
/*
create table student(
  id int primary key,
  name text
)
*/     
```

### [Grouped and Auto-Accessors](https://github.com/tc39/proposal-grouped-and-auto-accessors)

**Stage 2 に到達しませんでした**

<!-- TODO: 書く -->

## For Stage 1

### [Duplicate named capture groups](https://github.com/bakkot/proposal-duplicate-named-capturing-groups)

**Stage 2 に到達しました**

この提案はもともと Stage 0 でしたが、アジェンダ上の議題は

> Duplicate named capture groups for stage 1, 2, or 3 reaches Stage 2

でした。そして実際に Stage 1 をスキップして Stage 2 に到達しました。

<!-- TODO: 書く -->

### [`this` parameter](https://github.com/hax/proposal-this-parameter)

**Stage 1 に到達しなかったようです**

https://github.com/babel/proposals/issues/82 ではこのプロポーザルについての言及がない上に、2022年6月のミーティングの議事録はまだ公開されていないため Stage 1 に達成したかどうかはわかりません。ですが[プロポーザルの README](https://github.com/hax/proposal-this-parameter) には Stage 0 と書かれており、https://github.com/tc39/proposals/blob/main/stage-1-proposals.md にも掲載されていないため、おそらく Stage 1 には到達しなかったのでしょう。(TC39 の多くのドキュメントは手作業で管理されているので、更新し忘れている可能性もあります)

`this` parameter は、TypeScript の `this` parameter のような構文を JavaScript に導入するためのプロポーザルです。

次のようなモチベーションがあるようです。

- 様々なツールチェインのために TypeScript の `this` parameter を標準化すること
- JavaScript と TypeScript の間のギャップを埋めることで初学者にとって易しくなるため
- [Type Annotations](https://github.com/tc39/proposal-type-annotations) によってもたらされる負担をへらすため
- メソッドの構文を提供するため

現在 Stage 1 の [call-this](https://github.com/tc39/proposal-call-this) においては、this を明示できるほうがわかりやすいのかもしれません。

```js
function toHex(this) {
  return this.toString(16)
}
42~>toHex()
```

### [RegExp Atomic Operators](https://github.com/rbuckton/proposal-regexp-atomic-operators)

**Stage 1 に到達しました**

<!-- TODO: 書く -->

## Updates

ステージの移動はないものの更新が紹介された提案を列挙します。ここでは詳細については説明しませんがスライドや関連するIssueへのリンクを貼ったので興味のある人は参照してください。

### [Array Grouping](https://github.com/tc39/proposal-array-grouping)

Array Grouping は [Lodash の `groupBy`](https://lodash.com/docs/4.17.15#groupBy) のように配列をグルーピングするメソッドを導入するプロポーザルです。

今回の変更で `groupBy` と `groupByToMap` から `group` と `groupToMap` へとメソッドの名前が変更されました。

詳細は該当の Pull Request( https://github.com/tc39/proposal-array-grouping/pull/39 )を見てください。

### [Decorators](https://github.com/tc39/proposal-decorators)

- https://slides.com/pzuraq/decorators-normative-changes-2022-06

### [Shadow Realms](https://github.com/tc39/proposal-shadowrealm)

- https://github.com/tc39/proposal-shadowrealm/issues/365

### [Temporal](https://tc39.es/proposal-temporal/)

- http://ptomato.name/talks/tc39-2022-06/

### [`function.sent`](https://github.com/tc39/proposal-function.sent)

- https://johnhax.net/2022/function-sent/slide#0

### [Import Reflection](https://github.com/tc39/proposal-import-reflection)

- https://docs.google.com/presentation/d/1y0MAo7ymIWzyyrU9o3oKLiHc4BtQwLtqlU4Z_8_XYjU/edit#slide=id.p

## 参考リンク

- TC39
  - [agendas/06.md at main · tc39/agendas](https://github.com/tc39/agendas/blob/main/2022/06.md)
- Babel
  - [Jun 2022 · Issue #82 · babel/proposals](https://github.com/babel/proposals/issues/82)
- SpiderMonkey
  - [SpiderMonkey Newsletter (Firefox 102-103) | SpiderMonkey JavaScript/WebAssembly Engine](https://spidermonkey.dev/blog/2022/06/30/newsletter-firefox-102-103.html)
