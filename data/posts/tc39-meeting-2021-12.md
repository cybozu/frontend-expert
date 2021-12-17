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

## For Stage 3

## For Stage 2

## For Stage 1

## Updates

## Normative Changes

### `import.meta[Symbol.toStringTag]` の追加

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

そして今回のミーティングでもこの仕様の修正についての合意は得られませんでした。
議事録がまだ公開されていないので実際にどのような議論が行われたかはわかりませんが、事前に以下のような懸念が公開されていました。

- `import.meta` は、ECMAScript の範囲では [`HostGetImportMetaProperties`](https://tc39.es/ecma262/#sec-hostgetimportmetaproperties) というホスト定義の abstract operation によって中身が決定されるオブジェクトであるということしか決まっておらず、ホストにとって必要であればホスト側で `import.meta` の `Symbol.toStringTag` を定義できる。
- 仕様内で作成される他のオブジェクトとは異なり、`import.meta` はホストのデータによって生成されるものであり、ECMAScript の範囲でプロパティを生成することを考慮したものではない。

## 参考リンク

- TC39
  - [Agenda for the 87th meeting of Ecma TC39](https://github.com/tc39/agendas/blob/main/2021/12.md)
- babel/proposals
  - [Dec 2021 · Issue #78 · babel/proposals](https://github.com/babel/proposals/issues/78)
- ECMA262
  - [`import.meta`](https://tc39.es/ecma262/#prod-ImportMeta)
  - [`HostGetImportMetaProperties`](https://tc39.es/ecma262/#sec-hostgetimportmetaproperties)