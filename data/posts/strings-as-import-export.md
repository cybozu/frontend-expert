---
title: "なぜ ES2022 で文字列リテラルを使った import/export ができるようになるのか"
author: "sosukesuzuki"
createdAt: "2021-11-22"
summary: "ES2022 に含まれる予定の、識別子ではなく文字列リテラルを使って import/export できるようになる ECMAScript の仕様変更について解説します"
tags: ["ECMAScript"]
---

11 月 11 日に、以前から一部で注目されていた[ある Pull Request](https://github.com/tc39/ecma262/pull/2154) が [tc39/ecma262](https://github.com/tc39/ecma262) にマージされました。

この Pull Request がマージされたことで、モジュールから識別子ではなく文字列リテラルで import/export することが可能になりました。

この仕様変更はプロポーザルという形で扱われてはいませんが、構文上の影響があるので、JavaScript ユーザーとして知っておくに越したことはないものになります。

## 概要

まず具体例を示します。

今回の変更によって、次のように import/export する際の名前として文字列リテラルを使えるようになります。

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

ここからは仕様上の用語を使って解説をします。

この変更が入る前の ECMAScript では [`ImportSpecifier`](https://tc39.es/ecma262/#prod-ImportSpecifier) で `as` を使う場合 `as` の左側は [`IdentifierName`](https://tc39.es/ecma262/#prod-IdentifierName) でなければいけませんでした。
また [`ExportSpecifier`](https://tc39.es/ecma262/#prod-ExportSpecifier) は、単一の `IdentifierName` もしくは、`as` を使う場合は `as` の左側と右側は両方とも `IdentifierName` でなければいけませんでした。

今回の変更によって、新たに [`ModuleExportName`](https://tc39.es/ecma262/#prod-ModuleExportName) という構文が追加されました。`ModuleExportName` は、`IdentifierName` もしくは [`StringLiteral`](https://tc39.es/ecma262/#prod-StringLiteral) の形をとります。
たとえば、識別子 `foo` や 文字列リテラル `"😃 hey hey"` は `ModuleExportName` です。

そして、`ImportSpecifier` で `as` を使う場合 `as` の左側は `ModuleExportName` の形をとるようになりました。したがって、次の例の `import` 文はすべて構文として妥当です。

```js
import { foo } from "mod";
import { foo as bar } from "mod";
import { "😃 hey hey" as baz } from "mod";
```

`ExportSpecifier` は、単一の `ModuleExportName` もしくは、 `as` を使う場合 `as` の左側と右側は両方とも `ModuleExportName` の形をとるようになりました。したがって、次の例の `export` 文はすべて構文として妥当です。

```js
export { foo } from "mod";
export { "😃 hey hey" } from "mod";
export { foo as foo } from "mod";
export { foo as "😃 hey hey" } from "mod";
export { "😃 hey hey" as foo } from "mod";
export { "😃 hey hey" as "😃 hey hey" } from "mod";
```

ただし `ExportSpecifier` の `ModuleExportName` を `StringLiteral` にできるのは、その `ExportSpecifier` を含む [`ExportDeclaration`](https://tc39.es/ecma262/#prod-ExportDeclaration) に [`FromClause`](https://tc39.es/ecma262/#prod-FromClause) が存在する場合のみです。

たとえば、次のコードは `ExportDeclaration` に `FromClause` が存在しないので `ExportSpecifier` で `StringLiteral` を使うことはできません。

<!-- prettier-ignore -->
```js
// できない
export { "😃 hey hey" };
```

一方で、次のコードは `FromClause` が存在するので、`ExportSpecifier` で `StringLiteral` を使うことができます。

```js
// できる
export { "😃 hey hey" } from "mod";
```

## 文字列の制約

`StringLiteral` は通常の JavaScript の文字列リテラルです。たとえば `"foo"` とか `"bar"` みたいな形をしたものです。

`ModuleExportName` は `StringLiteral` を含むので、全ての文字列リテラルを `ModuleExportName` として使えるようにみえますが、実際には少々異なります。`ModuleExportName` として使える `StringLiteral` には制限があります。

**`ModuleExportName` として使える `StringLiteral` は、[Well-Formed Code Unit Sequence](https://www.unicode.org/glossary/#well_formed_code_unit_sequence) でなければいけません。**
このことは、[Module Semantics](https://tc39.es/ecma262/#sec-module-semantics) の Eary Errros 内の https://tc39.es/ecma262/#_ref_6583 に記載されています。

### Well-Formed Code Unit Sequence とは

JavaScript の文字列は UTF-16 でエンコードされます。そのため、実際には JavaScript の文字列というのは 16 ビットの整数で表現される Unicode のコードユニットの並びでしかありません。

UTF-16 では基本的に 1 文字につき 16 ビットで表現されます。しかし、Unicode の BMP(基本多言語面)に収まらない文字は 16 ビットのコードユニットを二つ並べたペアで表現します。

たとえば、ひらがなの `あ` は BMP に含まれており、一つのコードユニット(`0x3042`)で表されます。

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

しかし、`0xD842` 単体に対応する文字は Unicode には存在しません。

このような、**対になっていないサロゲートペアを含むような文字列は Well-Formed Code Unit Sequence ではありません。**

逆に、対になっていないサロゲートペアを許容しないような文字列を **Well-Formed Code Unit Sequence** といいます。つまり、大雑把にいえば「ちゃんと文字になっているコードユニットで構成された文字列」ということです。

ちなみに、このような Well-Formed な文字列は WebIDL では [USVString](https://developer.mozilla.org/ja/docs/Web/API/USVString) と呼ばれています。

### 新しい Abstract Operation `IsStringWellFormedUnicode`

この仕様の変更に伴って、[`IsStringWellFormedUnicode`](https://tc39.es/ecma262/#sec-isstringwellformedunicode) という新しい Abstract Operation が追加されました。

この Abstract Operation は、引数の文字列が Well-Formed Code Unit Sequence かどうかを判定します。

前述した `ModuleExportName` のための Early Errors では、この `IsStringWellFormedUnicode` Abstract Operation を使って `StringLiteral` が Well-Formed Code Unit Sequence かどうかの判定を行います。そしてもし Well-Formed Code Unit Sequence でなければ Syntax Error になります。

## 仕様変更のモチベーション

実はこの仕様の変更は、今の Web の仕様ではほとんど役に立つことはありません。

この変更が行われたモチベーションは、**将来的に** WebAssembly の Module との相互運用性を向上させるためです。

この背景を理解するために、おさえておくべき前提が二つあります。

１つ目は、WebAssembly の Module では関数を export するときに文字列で名前をつけるということです。
たとえば次の例では `$add` という関数を `"add"` という名前で export しています。

```wat
(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "add" (func $add))
)
```

２つ目は、WebAssembly の Module を JavaScript から import できるようにしたい、という動きがあるということです。[WebAsembly/esm-integration](https://github.com/WebAssembly/esm-integration) などで、その動きを見ることができます。

簡単にいえば、次のようにして簡単に WebAssembly の Module を JavaScript から扱えるようにしたいということです。

```js
import { add } from "foo.wasm";
console.log(add(1, 2)); // 3
```

現在の WebAssembly および ECMAScript の仕様では、このような形で JavaScript 側から WebAssembly の Module を読み込むことはできません。

これらを前提として上で、次の例について考えます。

この例は前述したものとほとんど変わりませんが、`export` の後ろが `"add"` ではなく `"+"` になっている WebAssembly の Module です。`export` の後ろには文字列を置くことができるので、これは妥当な Module です。

```wat
(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "+" (func $add))
)
```

将来、WebAssembly の Module を JavaScript から import できるようになったときに、このモジュールから `+` 関数を named import したいとします。
**しかし、`+` は `IdentifierName` ではないので、今までの ECMAScript の仕様では named import できませんでした。**

```js
// できない
import { + } from "foo.wasm";
```

```js
// できない
import { + as add } from "foo.wasm";
```

今回の変更によって `ImportSpecifier` の `as` の左側に `StringLiteral` を置けるようになったことで、次のように書るようになりました。

```js
// ES2022 でできる
import { "+" as add } from "foo.wasm";

console.log(add(1, 2)); // 3
```

このような書き方は ES2022 では構文上は妥当ですが、実際にはまだ WebAssembly の import はできません。

また、`ModuleExportName` の `StringLiteral` が Well-Formed Code Unit Sequence でなければならないという制約が存在するのも、WebAssembly との相互運用のためです。
WebAssembly のテキストフォーマットで `export` の後に続く文字列は Well-Formed Code Unit Sequence でなければいけないので、それと統一させたのでしょう。

## 参考リンク

- TC39
  - [Normative: Arbitrary module namespace identifier names by bmeck · Pull Request #2154 · tc39/ecma262](https://github.com/tc39/ecma262/pull/2154)
  - [Arbitrary module namespace identifier names · tc39/notes/notes/sept-21.md](https://github.com/tc39/notes/blob/master/meetings/2020-09/sept-21.md#arbitrary-strings-as-exportimport-names)
  - [tc39/proposal-import-reflection](https://github.com/tc39/proposal-import-reflection)
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
  - [Well-Formed Code Unit Sequence · Glossary of Unicode Terms](https://www.unicode.org/glossary/#well_formed_code_unit_sequence)
- WebAssembly
  - [WebAssembly/esm-integration: ECMAScript module integration](https://github.com/WebAssembly/esm-integration)
  - [Values — WebAssembly 1.1 (Draft 2021-12-02)](https://webassembly.github.io/spec/core/text/values.html#names)
  - [ESM isn't suited for importing objects containing non-JavaScript identifiers · Issue #39 · WebAssembly/esm-integration](https://github.com/WebAssembly/esm-integration/issues/39)
