---
title: "ECMAScriptの最新動向 2022年01月版"
author: "sosukesuzuki"
createdAt: "2022-03-09"
summary: "2021年01月24日~27日に開催された TC39 meeting 88th の内容を紹介します"
tags:
  - TC39
  - ECMAScript
---

この記事では2021年01月24日~27日に開催された TC39 meeting 88th で議題に上がったプロポーザルについて紹介します。

## For Stage 4

For Stage 4 の提案はありませんでした。

## For Stage 3

### [Array.fromAsync](https://github.com/tc39/proposal-array-from-async/)

**Stage 3 にはなりませんでした。**

`Array.fromAsync` は次のようにして非同期イテラブルから配列を生成するスタティックメソッドを追加するプロポーザルです。

```js
async function * asyncGen (n) {
  for (let i = 0; i < n; i++)
    yield i * 2;
}
const arr = await Array.fromAsync(asyncGen(4));
```

https://github.com/tc39/proposal-array-from-async/issues/19 で指摘された問題のため、Stage 3 にはなりませんでした。

## For Stage 2

### [Class brand checks](https://github.com/tc39/proposal-class-brand-check)

**Stage 2 にはなりませんでした**

Class brand checks は brand check のための新しい構文を導入するプロポーザルです。

brand check は TC39 内で使われる用語で、https://github.com/tc39/how-we-work/blob/master/terminology.md#brand-check で説明されています。

brand check とは、雑に言えば「ある値があるデータ型であることを検証すること」です。たとえば `Array.isArray` は brand check です([`instanceof` は厳密ではない](https://zenn.dev/sosukesuzuki/articles/e0516a3d4c424e)ため brand check ではありません)。

以前 brand check の方法の一つである [Ergonomic brand checks for private fields](https://github.com/tc39/proposal-private-fields-in-in) についての記事を書いたので興味のある方はそちらもご覧ください。

[ES2022 と TypeScript 4.5 に入るプライベートフィールドのための in 演算子について](https://cybozu.github.io/frontend-expert/posts/ergonomic-brand-checks-for-private-fields:embed)

Class branc check プロポーザルでは `class.hasInstance(x)` という新しい Meta Property を追加します。これはクラスの中でのみ使うことができ、引数として渡された値が今いるクラスのインスタンスかどうかをチェックします。

```js
class Foo {
  static isFoo(o) {
    return class.hasInstance(o);
  }
}

const foo = new Foo();
console.log(Foo.isFoo(foo)); // true

const obj = {};
console.log(Foo.isFoo(obj)); // false
```

## For Stage 1

### [enum](https://github.com/rbuckton/proposal-enum)

**Stage 1 にはなりませんでした。**

enum は列挙型を実現するためのプロポーザルです。このプロポーザルは 4 年ほど前から存在していましたがまた動き出したようです。

enum プロポーザルでは次のような構文を導入します。

```js
enum SyntaxKind {
  A,
  B,
  C
}
```

他のプログラミング言語の enum と構文上は似ています。

しかし細部の仕様について検討すべき事項が多く、今回のミーティングでは Stage 1 に到達することはありませんでした。[このスライド](https://docs.google.com/presentation/d/14WtGmdWjEYXIXZVWJWpERF98D90_BytceAu7b7DKr5Q/edit#slide=id.g10effb28f4f_0_273)に詳しくまとまっているので興味のある方はご覧ください。

### [Reversible string split](https://github.com/tc39/proposal-reversible-string-split)

**Stage 1 になりました。**

Reversible string split は可逆(Reversible)の文字列分割のための方法を導入するプロポーザルです。

JavaScript では `String.prototype.split` を使って文字列を分割できます。

[String.prototype.split()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/split:embed)

```js
const splitted = "A,B,C,D,E".split(",");
console.log(splitted); // [ 'A', 'B', 'C', 'D', 'E' ]
```

`String.prototype.split` は第2引数として非負の整数を渡すことで、分割する数を制限できます。

```js
const splitted1 = "A,B,C,D,E".split(",", 1);
console.log(splitted1); // [ 'A' ]

const splitted2 = "A,B,C,D,E".split(",", 2);
console.log(splitted2); // [ 'A', 'B' ]

const splitted3 = "A,B,C,D,E".split(",", 3);
console.log(splitted3); // [ 'A', 'B', 'C' ]
```

JavaScript 以外のいくつかの言語(Perl、PHP、Ruby、Go、Rust、Java など)では第2引数を受け取った `String.prototype.split` に相当する機能は、次のように文字列の分割を行います。

```js
const splitted2 = "A,B,C,D,E".split(",", 2);
console.log(splitted2); // [ 'A', 'B,C,D,E' ]
```

N-1 回分割され、残りの部分が戻り値の配列の末尾に含まれています(戻り値の配列の要素数が N)。

Reversible string split プロポーザルでは、このような振る舞いを持つ新しいメソッド `String.prototype.splitN` を導入します。

```js
const splitted2 = "A,B,C,D,E".splitN(",", 2);
console.log(splitted2); // [ 'A', 'B,C,D,E' ]
```

このような文字列分割メソッドを使うと、次のようにして分割する前の文字列を取得できます。

```js
const value = "A,B,C,D,E";
const separator = ",";
const n = 2;
console.log((value.splitN(separator, n).join(separator)) === value); // true
```

提案の名前に含まれている Reversible というのはこのような可逆性のことを指しているようです。

## Updates

### [Symbols as WeakMap keys](https://github.com/tc39/proposal-symbols-as-weakmap-keys)

Symbols as WeakMap keys は Symbol を WeakMap のキーとして使えるようにするためのプロポーザルです。

現在では一部情報が古くなっていますが以前このプロポーザルについて解説する記事を書いたので興味がある方はそちらもご覧ください。

[JavaScript の Symbols as WeakMap keys について](https://sosukesuzuki.dev/posts/symbols-as-weakmap-keys:embed)

以前から Symbols as WeakMap keys プロポーザルのモチベーションや基本的な振る舞いについては概ね合意がとれていました。しかし、Well-knwon Symbols やグローバルシンボルレジストリに登録された Symbol (Eternal Symbol と呼ばれている)についてはどのように扱うべきかという点で TC39 メンバー内でも意見が分かれていました。

今回のミーティングで Symbols as WeakMap keys チャンピョングループは、Eternal Symbol を WeakMap のキーとして使おうとするとエラーが throw されるという振る舞いを選択したことを発表しました。それにともなって、`WeakMap.isValidKey(x)`、`WeakSet.isValidValue(x)`、`WeakRef.isValidTarget(x)`、`FinalizationRegistry.isValidTarget(x)` などのいくつかのスタティックメソッドが追加される可能性があります。

しかし議事録によればまだ TC39 メンバーの中で意見が分かれているため仕様の決定には時間がかかりそうです。

## 参考リンク

- TC39
  - [agendas/01.md at main · tc39/agendas](https://github.com/tc39/agendas/blob/main/2022/01.md)
  - [notes/jan-24.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-01/jan-24.md)
  - [notes/jan-25.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-01/jan-25.md)
  - [notes/jan-26.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-01/jan-26.md)
  - [Proposal Array.fromAsync](https://github.com/tc39/proposal-array-from-async/)
  - [Proposal Symbols as WeakMap keys](https://github.com/tc39/proposal-symbols-as-weakmap-keys)
  - [Proposal `class.hasInstance()`](https://github.com/tc39/proposal-class-brand-check)
  - [Proposal enum](https://github.com/rbuckton/proposal-enum)
  - [Proposal Reversible string split](https://github.com/tc39/proposal-reversible-string-split)
- Babel
  - [Jan 2022 · Issue #80 · babel/proposals](https://github.com/babel/proposals/issues/80)
