---
title: "ECMAScriptの最新動向 2022年01月版"
author: "sosukesuzuki"
createdAt: "2022-03-06"
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

https://cybozu.github.io/frontend-expert/posts/ergonomic-brand-checks-for-private-fields

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

## Updates

### [Symbols as WeakMap keys](https://github.com/tc39/proposal-symbols-as-weakmap-keys)

Symbols as WeakMap keys は Symbol を WeakMap のキーとして使えるようにするためのプロポーザルです。

現在では一部情報が古くなっていますが以前このプロポーザルについて解説する記事を書いたので興味がある方はそちらもご覧ください。

https://sosukesuzuki.dev/posts/symbols-as-weakmap-keys/

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
- Babel
  - [Jan 2022 · Issue #80 · babel/proposals](https://github.com/babel/proposals/issues/80)
