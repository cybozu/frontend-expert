---
title: "ECMAScriptの最新動向 2021年12月版"
author: "sosukesuzuki"
createdAt: "2021-12-18"
summary: "2021年12月14日~15日に開催された TC39 meeting 87th の内容を紹介します"
tags:
  - TC39
  - ECMAScript
---

TC39 の 87 回目のミーティングが 12月14日 ~ 12月15日に開催されました。
このミーティングで議題に上がった提案と、そのステージの移動について紹介します。

## For Stage 4

**For Stage 4 の提案はありませんでした。**

## For Stage 3

### [Array Grouping](https://github.com/tc39/proposal-array-grouping)

**Stage 3 になりました**

Array Grouping は `Array.prototype.groupBy` と `Array.prototype.groupByToMap` を追加するプロポーザルです。

2021 年 10 月のミーティングで Stage 2 になったばかりですが、今回のミーティングで Stage 3 になりました。

また、今回から `Array.prototype.groupByToMap` が追加されています。

これは `groupBy` の結果が `Map` になったものです。

```js
const array = [1, 2, 3, 4, 5];
const odd  = { odd: true };
const even = { even: true };
const map = array.groupByToMap((num, index, array) => {
  return num % 2 === 0 ? even: odd;
});
console.log(map); // Map { {odd: true}: [1, 3, 5], {even: true}: [2, 4] }
```

## For Stage 2

## [Array.fromAsync](https://github.com/tc39/proposal-array-from-async/)

**Stage 2 になりました**

`Array.fromAsync` は非同期イテラブルから配列を生成するためのスタティックメソッドを追加するプロポーザルです。

JavaScript では `Array.from` を使ってイテラブルから配列を生成できます。しかし、非同期イテラブルから配列を生成することはできません。

このプロポーザルによって追加される `Array.fromAsync` メソッドを使うと次のようにして非同期イテラブルから配列を生成できます。

```js
async function * asyncGen (n) {
  for (let i = 0; i < n; i++)
    yield i * 2;
}
const arr = await Array.fromAsync(asyncGen(4));
```

## [RegExp `\R` escape](https://github.com/tc39/proposal-regexp-r-escape)

**Stage 2 になりませんでした**

RegExp `\R` escape は以前 [Regexp Features Parity]() として提案されていた正規表現の機能群の１つで、正規表現内で line terminator とシンプルにマッチングさせるために新しく `\R` を導入する提案です。

この機能は `u` もしくは `v` モードのみで有効になります。そして、大まかには次のパターンと等価です。

```js
(?>\r\n?|[\x0A-\x0C\x85\u{2028}\u{2029}])
```

この正規表現の機能は Perl をはじめとする多くの正規表現エンジンに実装されていて、TC39 においてもそのユースケースは認められているようです。

しかし、[Set Notation Proposal](https://github.com/tc39/proposal-regexp-set-notation) の sequece properties によって同等の機能が実現できる可能性があるためその方向で調査しなおすべきだという結論になり Stage 2 には到達しませんでした。

## For Stage 1

## Updates

ステージの移動はないものの、アップデートがあった提案です。

### [Shadow Realms](https://github.com/tc39/proposal-shadowrealm)

いくつかの仕様上の重要な変更があったようです。詳しくは[スライド](https://docs.google.com/presentation/d/12PM5c4_yUnqXHjvACh8HEN5oJwgei-0T0hX_hlqjfDU/edit#slide=id.ge435a9058a_0_0)に記載されています。

## Normative Changes

### [`import.meta[Symbol.toStringTag]` の追加](https://github.com/tc39/ecma262/pull/2106)

**合意は得られませんでした**

[`Symbol.toStringTag`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) という Well-known Symbol があります。
この Symbol は `Object.prototype.toString()` によって表示される文字列の決定に使われます。

具体的な例を示します。

オブジェクト `foo` の `[Symbol.toStringTag]` に `"I'm foo"` という文字列をセットしておくと、`foo.toString()` は `[object I'm foo]` になります。

```js
const foo = {
  [Symbol.toStringTag]: "I'm foo"
};
console.log(foo.toString()); // "[object I'm foo]"
```

今回のミーティングでは `import.meta` の `[Symbol.toStringTag]` に `"ImportMeta"` という文字列を設定するという修正について議論されました。

この挙動についての Issue は `import.meta` の策定時にも存在しましたが、そのときすでに `import.meta` が Stage 4 を達成していたことからクローズされました。

そして今回のミーティングでもこの仕様の修正についての合意は得られませんでした。この修正のための Pull Request が作成された時点で以下のような懸念が公開されていました。

- `import.meta` は、ECMAScript の範囲では [`HostGetImportMetaProperties`](https://tc39.es/ecma262/#sec-hostgetimportmetaproperties) というホスト定義の abstract operation によって中身が決定されるオブジェクトであるということしか決まっておらず、ホストにとって必要であればホスト側で `import.meta` の `Symbol.toStringTag` を定義できる。
- 仕様内で作成される他のオブジェクトとは異なり、`import.meta` はホストのデータによって生成されるものであり、ECMAScript の範囲でプロパティを生成することを考慮したものではない。

## 参考リンク

- TC39
  - [Agenda for the 87th meeting of Ecma TC39](https://github.com/tc39/agendas/blob/main/2021/12.md)
  - [Normative: Add import.meta[Symbol.toStringTag]](https://github.com/tc39/ecma262/pull/2106)
  - [Proposal Array Grouping](https://github.com/tc39/proposal-array-grouping)
  - [Proposal Shadow Realms](https://github.com/tc39/proposal-shadowrealm)
  - [Proposal `Array.fromAsync`](https://github.com/tc39/proposal-array-from-async/)
  - [Proposal RegExp `\R` escape](https://github.com/tc39/proposal-regexp-r-escape)
  - [Proposal Set Notation](https://github.com/tc39/proposal-regexp-set-notation)
- Babel
  - [Dec 2021 · Issue #78 · babel/proposals](https://github.com/babel/proposals/issues/78)
- ECMA262
  - [`import.meta`](https://tc39.es/ecma262/#prod-ImportMeta)
  - [`HostGetImportMetaProperties`](https://tc39.es/ecma262/#sec-hostgetimportmetaproperties)
