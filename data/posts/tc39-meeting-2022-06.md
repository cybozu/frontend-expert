---
title: "ECMAScriptの最新動向 2022年06月版"
author: "sosukesuzuki"
createdAt: "2022-07-11"
summary: "2022年06月06日~09日に開催された TC39 meeting 90th の内容を紹介します"
tags:
  - TC39
  - ECMAScript
---

この記事では2022年06月06日~09日に開催された TC39 meeting 90th で議題に上がったプロポーザルを紹介します。

### For Stage 4

### [`findLast` / `findLastIndex`](https://github.com/tc39/proposal-array-find-from-last/)

**Stage 4 に到達しました**

`findLast` は `findLastIndex` は、`Array.prototype.find` と `Array.prototype.findLastIndex` の逆から走査するバージョンです。

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

スライド( http://www.rricard.me/serve/tc39-jun2022-symbols-as-wm-keys.pdf ) 上では次のように書かれています。

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

Grouped and Auto-Accessors はクラスのアクセサを定義する新しい方法を導入するプロポーザルです。

まず Grouped は次のようにして一つのプロパティのアクセサをまとめて定義できます。

```js
class C {
  accessor x {
    get() {...}
    set() {...}
  }
}
const obj = {
  accessor x {
    get() {...}
    set() {...}
  }
}
```

そして Auto-Accessors は Grouped に対するシンタックスシュガーのようなものです。

```js
class C {
  accessor a = 1; // `accessor a { get; set; } = 1` と同じ
}
```

プロポーザルに README では様々なパターンが紹介されているので興味がある人はそちらを参照してください。

## For Stage 1

### [Duplicate named capture groups](https://github.com/bakkot/proposal-duplicate-named-capturing-groups)

**Stage 2 に到達しました**

この提案はもともと Stage 0 でしたが、アジェンダ上の議題は

> Duplicate named capture groups for stage 1, 2, or 3 reaches Stage 2

でした。そして実際に Stage 1 をスキップして Stage 2 に到達しました。

Duplicate named capture groups は正規表現の中で同名の名前付きグループを複数記述可能にするためのプロポーザルです。

次のコードを見てください。

```js
str.match(/(?<year>[0-9]{4})-[0-9]{2}|[0-9]{2}-(?<year>[0-9]{4})/);
```

これは yyyy-MM もしくは MM-yyyy の形をした文字列のマッチする正規表現ですが、現在の ECMAScript としてはインバリッドです。なぜなら同じ正規表現の中で同名の名前付きキャプチャグループが複数存在するからです。

このようなケースでは、同じ正規表現の中に同名の名前付きキャプチャグループを複数記述できると便利です。


### [`this` parameter](https://github.com/hax/proposal-this-parameter)

**Stage 1 に到達しませんでした**

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

RegExp Atomic Operators はバックトラックを制御するための新しい構文を正規表現に追加するプロポーザルです。

たとえば `/a(bc|b)c/` という正規表現は `"abcc"` にも `"abc"` にもマッチします。
`"abcc"` のときは単純で、まず先頭の `a` がマッチし、次に `(bc|b)` の `bc` にマッチして、最後に `c` がマッチします。
一方で `"abc"` のときはやや複雑です。まず先頭の `a` がマッチし、次に `(bc|b)` の `bc` にマッチしますが、そうすると最後の `c` にはマッチできません。そこで `(bc|b)` までもどります。前回のマッチングにおいて `bc` ではマッチできなかったので、もう一つの選択肢である `b` にマッチさせます。そして最後の `c` にマッチします。

このような後続のパターンがマッチしない場合に一つ前のパターンに戻ってマッチを試みることをバックトラックといいます。RegExp Atomic Operators はこのようなバックトラックを制御するための構文を追加します。

たとえば前述の `/a(bc|b)c` というパターンでバックトラックが発生しないように Atomic Operators を使って書くと `/a(?>(bc|b))c` になります。このパターンでは `"abcc"` にはマッチしますが、`(bc|c)` へのバックトラックが発生しないため `"abc"` にはマッチしません。

他にもいくつかの新しい構文があるみたいなので興味がある人はプロポーザルの README かスペックテキストを参照してください。

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
  - [notes/jun-06.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-06/jun-06.md)
  - [notes/jun-07.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-06/jun-07.md)
  - [notes/jun-08.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-06/jun-08.md)
- Babel
  - [Jun 2022 · Issue #82 · babel/proposals](https://github.com/babel/proposals/issues/82)
- SpiderMonkey
  - [SpiderMonkey Newsletter (Firefox 102-103) | SpiderMonkey JavaScript/WebAssembly Engine](https://spidermonkey.dev/blog/2022/06/30/newsletter-firefox-102-103.html)
