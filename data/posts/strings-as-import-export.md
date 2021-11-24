---
title: "モジュールから文字列を import/export できるようになる ECMAScript 仕様の修正"
author: "sosukesuzuki"
createdAt: "2021-11-22"
summary: ""
tags: ["ECMAScript"]
---

11月11日に、以前から一部で注目されていた[とある Pull Request](https://github.com/tc39/ecma262/pull/2154) が [tc39/ecma262(ECMAScript)](https://github.com/tc39/ecma262) にマージされました。
この変更は、識別子ではなく文字列の import/export を可能にします。

この変更はプロポーザルという形で扱われてはいません。しかし構文上の影響があるので、JavaScript ユーザーとして知っておくに越したことはないでしょう。

## 概要

聞いただけではイメージしにくいと思うので、具体例を示します。

次のようにして emoji や空白を含めた名前として import/export できるようになります。

```js
const foo = "foo";
export { foo as "😃 hey hey" };
```

```js
import { "😃 hey hey" as foo } from "./module.js";
console.log(foo); // foo
```

基本的にはこれだけです。

ここからは、仕様上の用語を使って解説をします。

この変更が入る前の ECMAScript では、`import` 内の `as` の左側は [`IdentifierName`](https://tc39.es/ecma262/#prod-IdentifierName) でなければいけませんでした(`import` の `as` の右側は [`ImportBinding`](https://tc39.es/ecma262/#prod-ImportedBinding) です。これは `Identifier` のようなものですが、ここでは詳しく解説しません)。
また、`export` 内の `as` は、左右どちらとも `IdentifierName` でなければいけませんでした。(`IdentifierName` は [MDN](https://developer.mozilla.org/ja/docs/Glossary/Identifier)で説明されている普通の識別子です)

今回の変更によって、新たに [`ModuleExportName`](https://tc39.es/ecma262/#prod-ModuleExportName) という構文が追加されました。`ModuleExportName` は、`IdentifierName` もしくは [`StringLiteral`](https://tc39.es/ecma262/#prod-StringLiteral) です。そして、`import` の `as` の左側と、`export` の `as` の左右両方に `ModuleExportName` を置くことができるようになりました。

ただし、`export` の `as` の左側を `StringLiteral` にできるのはその `export` に `from` が存在する場合のみです。

```js
// できない
export { "foo" as "foo" };
```

```js
// できる
export { "foo" as "foo" } from "some-module";
```

## 文字列の制約

`StringLiteral` は一般的に思い浮かぶであろう JavaScript の文字列です。`ModuleExportName` は `StringLiteral` を含むので、全ての文字列を import/export できるように見えますが、実は少し違います。export/import できる文字列には制限があるのです。

import/export する文字列は [Well-Formed Code Unit Sequence](http://www.unicode.org/glossary/#well_formed_code_unit_sequence) である必要があります。Well-Formed Code Unit Sequece は、対になっていないサロゲートコードポイントを許容しない文字列です。
WebIDL の [USVString](https://developer.mozilla.org/ja/docs/Web/API/USVString) と同じです。

JavaScript の文字列は基本的に UTF-16 のコードユニットのシーケンスです。なので、対が存在しないサロゲートペアを含む文字列を許容します。(このような文字列は [DOMString]() と呼ばれています)

## モチベーション

## 参考リンク

- [Normative: Arbitrary module namespace identifier names by bmeck · Pull Request #2154 · tc39/ecma262](https://github.com/tc39/ecma262/pull/2154)
- [notes/sept-21.md at master · tc39/notes](https://github.com/tc39/notes/blob/master/meetings/2020-09/sept-21.md#arbitrary-strings-as-exportimport-names)
- [Parse string export names by default (`moduleStringNames`) by nicolo-ribaudo · Pull Request #13195 · babel/babel](https://github.com/babel/babel/pull/13195)
- https://babeljs.io/blog/2020/10/15/7.12.0#imports-and-exports-with-string-names-12091httpsgithubcombabelbabelpull12091
- [Identifier (識別子) - MDN Web Docs 用語集: ウェブ関連用語の定義 | MDN](https://developer.mozilla.org/ja/docs/Glossary/Identifier)
