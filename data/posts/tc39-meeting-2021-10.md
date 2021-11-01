---
title: "TC39 meeting 86th の概要と注目ポイント"
author: "sosukesuzuki"
editor: "nakajmg"
createdAt: "2021-10-21"
summary: ""
tags:
  - TC39
---

TC39 の 86 回目のミーティングが 10/25 ~ 10/28 に開催されました。
このミーティングで議題に上がった提案と、そのステージの移動について紹介します。

- [agendas/10.md at master · tc39/agendas](https://github.com/tc39/agendas/blob/master/2021/10.md)
- [Oct 2021 · Issue #77 · babel/proposals](https://github.com/babel/proposals/issues/77)

## for Stage 4

### [Error Cause](https://github.com/tc39/proposal-error-cause)

**Stage 4 になりました。ECMAScript 2022 に入ります**

Error Cause は、`Error` コンストラクタの第2引数に `cause` という値で原因となったエラーを渡すことができるようにする提案です。
キャッチする側では、`error.cause` で、そのエラーを取得できます。

例を示します。

`doUploadJob` 関数では `fetch` を実行して失敗したときに新しいエラーをスローします。そのエラーの第2引数に `{ cause: err }` というオブジェクトを渡しています。
ここで `doUploadJob` がスローするエラーのメッセージは `"Upload job result failed"` ですが、その原因となったエラーを `cause` として渡すことで、キャッチする側でどのエラーが原因で失敗したのかを取得できます。
この例では、`doUploadJob` が失敗した原因が `TypeError: Failed to fetch` であったことがわかります。

```js
async function doUploadJob() {
  await fetch("https://example.com/upload").catch(err => {
    throw new Error("Upload job result failed",  { cause: err });
  });
}

try {
  await doJob();
} catch (e) {
  console.log(e);
  console.log('Caused by', e.cause);
}
// Error: Upload job result failed
// Caused by TypeError: Failed to fetch
```

## for Stage 3

今回は、for Stage 3 の提案はありませんでした。

## for Stage 2

### [Array Grouping](https://github.com/tc39/proposal-array-grouping)

**Stage 2 になりました**

Array Grouping は、`Array` に `groupBy` というインスタンスメソッドを追加する提案です。

[Lodash の `groupBy`](https://lodash.com/docs/4.17.15#groupBy) とおなじです。

```js
const array = [1, 2, 3, 4, 5];
array.groupBy((i) => {
  return i % 2 === 0 ? "even" : "odd";
});
// =>  { odd: [1, 3, 5], even: [2, 4] }
```

### [Partial Application](https://github.com/tc39/proposal-partial-application)

**Stage 2 になりませんでした**

Partial Application は、関数の部分適用のための構文を導入します。

例を示します。

`add` は2つの引数を受け取り、その2つを足し合わせて返すだけの単純な関数です。
そして、Partial Application を使って `addOne` という新しい関数を作っています。`addOne` は、1つの引数を受け取り、それに`1`を足して返す関数です。
つまり、既存の関数の一部の引数だけ渡して、残りの引数を受け取るような関数を作ることができます。

```js
const add = (x, y) => x + y;
const addOne = add~(1, ?);
addOne(2); // 3
```

現在の JavaScript で表現すると、次のようになります。

```js
const add = x => y => x + y;
const addOne = add(1);
addOne(2); // 3
```

Haskell のような関数型プログラミング言語では標準で備わっている機能です。
## for Stage 1

### [`String.cooked`](https://github.com/bathos/proposal-string-cooked)

**Stage 1 になりました**

`String.cooked` は `String` に新しいスタティックメソッド `cooked` を追加する提案です。
`String.cooked` は [`String.raw`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/raw) と逆のことをします。

```js
String.raw`mmm ... \u0064elicious cooked string`
// mmm ... \u0064elicious cooked string
String.cooked`mmm ... \u0064elicious cooked string`;
// "mmm ... delicious cooked string"
```

つまり、通常のテンプレートリテラルとおなじ挙動です。

```js
`mmm ... \u0064elicious cooked string`;
// "mmm ... delicious cooked string"
```

この機能がタグ付きテンプレートリテラルとして存在することで、これを用いて新しいタグ付きテンプレートリテラルを作るときに役にたちます。

```js
function myTag(strings, ...values) {
  return String.cooked(strings, ...values.map(value => String(value).toUpperCase())
}

myTag`hello ${'world'}` // "hello WORLD"
```

### [Destructure Private Fields](https://github.com/jridgewell/proposal-destructuring-private)

**Stage 1 を飛ばして、Stage 2 になりました**

Destructure Private Fields は、プライベートフィールドの分割代入のための構文を導入します。

`#` からはじまる識別子は普通には存在できないので、別の名前にリネームする必要があります。次の例では `this.#x` を `x` という名前にリネームしています。

```js
class Foo {
  #x = 1;
  constructor() {
    console.log(this.#x); // => 1
    const { #x: x } = this;
    console.log(x); // => 1
  }
}
```

### [Bind-this operator](https://github.com/js-choi/proposal-bind-this)

**Stage 1 になりました**

Bind this operator は、[Function.prototype.bind](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) と同様の方法で関数をバインドするための二項演算子を導入する提案です。

以前から存在する Stage 0 の [Bind Operator](https://github.com/tc39/proposal-bind-operator) の後継であり、Stage 1 の [Extensions](https://github.com/tc39/proposal-extensions) の競合です。

```js
Object.prototype.hasOwnProperty.call({ foo: "foo" }, "foo"); // true
({ foo: "foo" }::Object.prototype.hasOwnProperty("foo")); // true
```

### [Function helpers](https://github.com/js-choi/proposal-function-helpers)

**Stage 1 になりませんでした。この提案に含まれる関数は個別の提案として再度提出されるかもしれません。**

Function helpers は、`Function` のスタティックメソッドとして便利なヘルパー関数を追加する提案です。

`Function.flow` は引数に与えられた関数を合成した新しい関数を返します。

```js
const f = Function.flow(f0, f1, f2);
f(5, 7); // f2(f1(f0(5, 7))).
```

`Function.pipe` は第1引数の値を、それ移行の引数として渡された関数を合成した関数に渡した結果を返します。

```js
Function.pipe(5, f0, f1, f2); // f2(f1(f0(5))).
```

`Function.constant` は、第1引数として渡された値を返し続ける関数を返します。

```js
const f = Function.constant(3);
f("fooo"); // 3
f(3009, 33, 44); // 3
f({ foo: "foo" }); // 3
```

`Function.identifiy` は、第1引数に与えられた値をそのまま返します。

```js
Function.identity(3); // 3
Function.identity(4, 5); // 4
```

`Function.tap` はコールバック関数を引数として受け取り、関数を返します。
`Function.tape` が返した関数に引数を渡すと、それをコールバック関数に渡して実行し、その上でその引数をそのまま返します。
言葉で説明すると難しいですが、例を見れば簡単だと思います。

```js
const f = Function.tap(console.log);
f(5); // 5 を出力して、5 を返す
```

### [Evaluator Attributes](https://github.com/lucacasonato/proposal-evaluator-attributes)

**Stage 1 になりました**

Evaluator Attributes は、インポートされたモジュールの評価方法を処理系に伝えるための構文を導入します。

例にある通り、提案された目的は WebAssembly のモジュールを JavaScript の Import 文で読み込むためです。しかし、提案の仕様としては WebAssembly には限られていません。

```js
import mod from "./foo.wasm" as "wasm-module";
mod instanceof WebAssembly.Module; // true
```

現在 Stage 3 の [Import Assertions](https://github.com/tc39/proposal-import-assertions) に似ていますが、Import Assertions はモジュールの評価方法に影響を与えることはできません。

### RegExp Features

前回のミーティングで提案された[RegExp Features](https://github.com/rbuckton/proposal-regexp-features)が機能ごとに別々の提案に分割されました。

#### [RegExp Modifiers](https://github.com/rbuckton/proposal-regexp-modifiers)

**Stage 1 になりました**

#### [RegExp Extended Mode and Comments](https://github.com/rbuckton/proposal-regexp-x-mode)

**Stage 1 になりました**

#### [RegExp Atomic Operators](https://github.com/rbuckton/proposal-regexp-atomic-operators)

**Stage 1 になりませんでした**

#### [RegExp `\R` Escape](https://github.com/rbuckton/proposal-regexp-r-escape)

**Stage 1 になりました**

#### [RegExp Buffer Boundaries](https://github.com/rbuckton/proposal-regexp-buffer-boundaries)

**Stage 1 になりました**

### Updates

ステージの移動はないものの、アップデートがあった提案です。

- [Change Array by Copy](https://github.com/tc39/proposal-change-array-by-copy)
- [JSON.parse sourct text access](https://github.com/tc39/proposal-json-parse-with-source)
- [Records & Tuples](https://github.com/tc39/proposal-record-tuple/)
- [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management)
- [JS Module Blocks](https://github.com/tc39/proposal-js-module-blocks)
- [Array.fromAsync](https://github.com/js-choi/proposal-array-from-async)

## その他

提案ではなく、仕様書の変更として扱われているものです。

### [Extending null](https://github.com/tc39/ecma262/pull/1321)

**合意は得られませんでした**

```js
class Foo extends null {}
```
