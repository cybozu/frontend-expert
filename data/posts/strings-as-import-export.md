---
title: "識別子でなく文字列を import/export できるようになる ECMAScript 仕様の修正について"
author: "sosukesuzuki"
createdAt: "2021-11-22"
summary: ""
tags: ["ECMAScript"]
---

11月11日に、以前から一部で注目されていた[とある Pull Request](https://github.com/tc39/ecma262/pull/2154) が [tc39/ecma262(ECMAScript)](https://github.com/tc39/ecma262) にマージされました。
この変更は、識別子ではなく文字列の import/export を可能にします。

この変更はプロポーザルという形で扱われてはいません。しかし構文上の影響があるので、JavaScript ユーザーとして知っておくに越したことはないでしょう。

## まとめ

以下のような仕様の変更の ECMAScript 2022 に含まれる予定です

- `ModuleExportName` という新しい構文が追加される
  - `ModuleExportName` は `IdentifierName` もしくは `StringLiteral` の形をとる
  - `ModuleExportName` が `StringLiteral` のときは Well-Formed UTF-16 Sequence でなければならない
- `ImportSpecifier` の `as` の左側に `ModuleExportName` を書けるようになる
- `ExportSpecifier` の `as` の左側と右側に `ModuleExportName` を書けるようになる

## 概要

聞いただけではイメージしにくいと思うので、具体例を示します。

次のようにして、import/export する際の名前として文字列を使えるようになります。

```js
const foo = "foo";
export { foo as "😃 hey hey" };
```

```js
import { "😃 hey hey" as foo } from "./module.js";
console.log(foo); // foo
```

基本的にはこれだけです。

## 詳解

ここからは、仕様上の用語を使って解説をします。

この変更が入る前の ECMAScript では、[`ImportSpecifier`](https://tc39.es/ecma262/#prod-ImportSpecifier) の `as` の左側は [`IdentifierName`](https://tc39.es/ecma262/#prod-IdentifierName) でなければいけませんでした(`ImportSpecifier` の右側は [`ImportBinding`](https://tc39.es/ecma262/#prod-ImportedBinding) でなければいけません。これは大雑把にいえば `Identifier` のようなものです)。

また、[`ExportSpecifier`](https://tc39.es/ecma262/#prod-ExportSpecifier) の `as` の左側と右側は両方とも `IdentifierName` でなければいけませんでした。(`IdentifierName` は [MDN](https://developer.mozilla.org/ja/docs/Glossary/Identifier)で説明されている普通の識別子です)

今回の変更によって、新たに [`ModuleExportName`](https://tc39.es/ecma262/#prod-ModuleExportName) という構文が追加されました。`ModuleExportName` は、`IdentifierName` もしくは [`StringLiteral`](https://tc39.es/ecma262/#prod-StringLiteral) です。たとえば、`foo` や `"foo"` は `ModuleExportName` です。

そして、`ImportSpecifier` の `as` の左側と、`ExportSpecifier` の `as` の右側と左側に `ModuleExportName` を置くことができるようになりました。

ただし `ExportSpecifier` の `as` の左側を `StringLiteral` にできるのはその `ExportSpecifier` を含む [`ExportDeclaration`](https://tc39.es/ecma262/#prod-ExportDeclaration) に [`FromClause`](https://tc39.es/ecma262/#prod-FromClause) が存在する場合のみです。

たとえば、次のコードは `ExportDeclaration` に `FromClause` が存在しないので `ExportSpecifier` の `as` の左右に `ModuleExportName` を書けません。

```js
// できない
export { "foo" as "foo" };
```

一方で、次のコードは `FromClause` が存在するので、`ExportSpecifier` の `as` の左右に `ModuleExportName` を書けます。

```js
// できる
export { "foo" as "foo" } from "some-module";
```

## 文字列の制約

`StringLiteral` は通常の JavaScript の文字列リテラルです。たとえば `"foo"` とか `"bar"` みたいな形をしたものです。

`ModuleExportName` は `StringLiteral` を含むので、全ての文字列を `ModuleExportName` として使えるように思えますが、実は少し違います。`ModuleExportName` として使える `StringLiteral` には制限があります。

**`ModuleExportName` として使える `StringLiteral` は、[Well-Formed Unicode Sequence](https://www.unicode.org/glossary/#well_formed_code_unit_sequence) でなければいけません。**(このことは、[Module Semantics](https://tc39.es/ecma262/#sec-module-semantics) の Eary Errros 内の https://tc39.es/ecma262/#_ref_6583 に記載されています)

### Well-Formed Unicode Sequence とは

JavaScript の文字列は UTF-16 でエンコードされます。なので、実際のところ JavaScript の文字列というのは 16 ビットの整数で表現される Unicode のコードユニットの並びでしかありません。

UTF-16 では基本的に 1 文字につき 16 ビットで表現されます。しかし、Unicode の BMP(基本多言語面)に収まらない文字は 16 ビットのコードユニットを二つ並べたペアで表現します。

たとえば、ひらがなの `あ` は BMP に含まれるので、一つのコードユニット(`0x3042`)で表されます。

```js
console.log("\u3042"); // あ
```

一方で、`𠮟`(`叱` ではないことに注意) は BMP に含まれないので、二つのコードユニット(`0xD842` と `0xDF9F`)で表されます。これがサロゲートペアです。

```js
console.log("\uD842\uDF9F"); // 𠮟
```

前述のとおり、JavaScript の文字列は 16 ビットの整数で表現されるコードユニットの並びでしかありません。したがって、`𠮟` を構成する二つのコードユニットである `0xD842` と `0xDF9F` のうち一つだけを含む文字列も作ることができます。

```js
const str = "\uD842";
```

しかし、`\uD842` に対応するコードポイントは Unicode には存在しません。

このような、**対になっていないサロゲートペアを含むような文字列は Well-Formed Unicode Sequece ではありません。**

逆に、対になっていないサロゲートペアを許容しないような文字列を **Well-Formed Unicode Sequece** といいます。つまり、大雑把にいえば「ちゃんと文字になっているコードユニットで構成された文字列」ということです。

ちなみに、このような文字列は WebIDL では [USVString](https://developer.mozilla.org/ja/docs/Web/API/USVString) と呼ばれています。

### 新たな Abstract Operation: `IsStringWellFormedUnicode`

この仕様の変更に伴って、[`IsStringWellFormedUnicode`](https://tc39.es/ecma262/#sec-isstringwellformedunicode) という新しい Abstract Operation が追加されました。

この Abstract Operation は引数の文字列が Well-Formed かどうかを判定します。

前述した `ModuleExportName` のための Eary Errors では、この `IsStringWellFormedUnicode` Abstract Operation を使って `StringLiteral` が Well-Formed かどうかの判定を行い、Well-Formed でなければ Syntax Error になります。

(この Abstract Operation は、現在 Stage 1 の [`isUSVString`](https://github.com/guybedford/proposal-is-usv-string) というプロポーザルでも使われるかもしれません。)

## モチベーション

## 参考リンク

- TC39
  - [Normative: Arbitrary module namespace identifier names by bmeck · Pull Request #2154 · tc39/ecma262](https://github.com/tc39/ecma262/pull/2154)
  - [Arbitrary module namespace identifier names · tc39/notes/notes/sept-21.md](https://github.com/tc39/notes/blob/master/meetings/2020-09/sept-21.md#arbitrary-strings-as-exportimport-names)
- Babel
  - [Parse string export names by default (`moduleStringNames`) by nicolo-ribaudo · Pull Request #13195 · babel/babel](https://github.com/babel/babel/pull/13195)
  - [7.12.0 Released: TypeScript 4.1, strings as import/export names, and class static blocks · Babel](https://babeljs.io/blog/2020/10/15/7.12.0#imports-and-exports-with-string-names-12091httpsgithubcombabelbabelpull12091)
- MDN
  - [Identifier (識別子) - MDN Web Docs 用語集: ウェブ関連用語の定義](https://developer.mozilla.org/ja/docs/Glossary/Identifier)
  - [USVString - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/USVString)
- ECMA262
  - [ImportSpecifier · ECMAScript® 2022 Language Specification](https://tc39.es/ecma262/#prod-ImportSpecifier)
  - [ExportSpecifier · ECMAScript® 2022 Language Specification](https://tc39.es/ecma262/#prod-ExportSpecifier)
  - [ModuleExportName · ECMAScript® 2022 Language Specification](https://tc39.es/ecma262/#prod-ModuleExportName)
  - [IsStringWellFormedUnicode · ECMAScript® 2022 Language Specification](https://tc39.es/ecma262/#sec-isstringwellformedunicode)
- Unicode
  - [Well-Formed Unicode Sequece · Glossary of Unicode Terms](https://www.unicode.org/glossary/#well_formed_code_unit_sequence)
