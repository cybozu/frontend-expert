---
title: "ECMAScriptの最新動向 2022年03月版"
author: "sosukesuzuki"
createdAt: "2022-05-22"
summary: "2021年03月28日~31日に開催された TC39 meeting 89th の内容を紹介します"
tags:
  - TC39
  - ECMAScript
---

この記事では2021年03月28日~31日に開催された TC39 meeting 89th で議題に上がったプロポーザルを紹介します。

## For Stage 4

For Stage 4 の提案はありませんでした。

## For Stage 3

### [RegExp set notation + Unicode properties of strings](https://github.com/tc39/proposal-regexp-v-flag)

**Stage 3 に到達しました**

このプロポーザルは正規表現に新しく`v`フラグを導入し、その中で set notation と Unicode properties of strings を使えるようにします。
(翻訳するとしたら set notation は「集合の表記」、properties of strings は「文字列プロパティ」でしょうか。定訳がわからないのでこの記事ではこれらの用語を英語のまま表記します。)

まず、set notation とは次のような記法のことです。
(`A` や `B` は character class (`[a-z]`など) もしくは Unicode property escape (`\p{ASCII}`など) とします)

```
// 差(difference/subtraction)
[A--B]

// 共通部分(intersection)
[A&&B]

// nested character class
[A--[0-9]]
```

[プロポーザルのリポジトリでは実用的なユースケースが紹介されています。](https://github.com/tc39/proposal-regexp-v-flag#illustrative-examples)

次に Unicode properties of strings は、domain が character や code point ではなく string (character の sequence) であるような Unicode property のことです。
(Unicode の property については Unicode の [UTS18](https://www.unicode.org/reports/tr18/#Categories) の Properties を読むのがわかりやすいと思います)

このプロポーザルの中では次の property of string がサポートされるようです。(ref: https://github.com/tc39/ecma262/pull/2418/files#diff-00f81a4e81713d00d0ebd710c18a798b699d244361ceb04fecbb06db6b32e8ba)
(見たところどれも Binary のものしかありませんが、今後他の datatype のものも追加されるかどうかはわかりません)

- `Basic_Emoji`
- `Emoji_Keycap_Sequence`
- `RGI_Emoji_Modifier_Sequence`
- `RGI_Emoji_Flag_Sequence`
- `RGI_Emoji_Tag_Sequence`
- `RGI_Emoji_ZWJ_Sequence`
- `RGI_Emoji`

これによって複数の code point からなる Emoji に対して Unicode property escape を使ってマッチさせられるようです。

Unicode についてはあまり詳しくないので誤りを見つけた人は教えてほしいです。

もともとは[別のプロポーザル](https://github.com/tc39/proposal-regexp-unicode-sequence-properties)でしたが、2021年5月にこのプロポーザルにマージされました。

### [Change Array by Copy](https://github.com/tc39/proposal-change-array-by-copy)

**Stage 3 に到達しました**

Change Array by Copy は Array と TypedArray にいくつかのイミュータブルなメソッドを追加するプロポーザルです。

以前この提案について記事を書いたのでより深く知りたい場合はそちらも参照してください(この記事は約1年前に書かれたものなので、現在提案されている仕様とは異なる部分があります)。

[JavaScript にイミュータブルな配列操作メソッドを導入するプロポーザルについて](https://sosukesuzuki.dev/posts/change-array-by-copy:embed)

このプロポーザルについての議論では、新たに追加されるメソッドをどのように命名するかが主な論点にあがっていました。

現在では次のような `with` + `メソッド名` + `ed` という形で落ち着いたようです。

```js
// ミュータブルなメソッド
["a", "b", "c"].reverse();

// イミュータブルなメソッド
["a", "b", "c"].withReversed();
```

これらのメソッドは便利な一方、配列をコピーして返すため配列の要素数に応じて発生するオーバーヘッドを考慮して使う必要があります。

### [Decorators](https://github.com/tc39/proposal-decorators)

**Stage 3 に到達しました**

Decorators はクラスを拡張するための構文を導入するプロポーザルです。

このプロポーザルは5年以上に渡って議論が行われてきた上、TypeScript によって早期からサポートされていたため開発者に広く認知されています。

ミーティングで使われたスライドの冒頭では

> What is a decorator?
> Decorators are _functions_ which have four main capabilities when applied to a class or class element
> - Replacement
> - Initialization
> - Metadata
> - Access

と説明されています。

ちなみに現在 TypeScript に実装されている Decorators は現在の TC39 の Decorators とは異なるものです。[TypeScript 4.8 で TC39 の Decorators を実装することが検討されています。](https://github.com/microsoft/TypeScript/issues/49074)

筆者としては、Decorators はコードを書くときの体験を大きく変えうる機能である一方で、複雑で厄介なコードを生み出す可能性も高い機能だと考えています。
したがって一般的な Web アプリケーション開発にとっては、アプリケーション側からはライブラリ開発者が提供する Decorators を使用する程度にとどめておくのが、適切な関わり方なのではないかと思っています。

この新しい Decorators に対してコミュニティがどのように向き合っていくのか、動向が気になるところです。

## For Stage 2

### [Pattern Matcing](https://github.com/tc39/proposal-pattern-matching)

**Stage 2 に到達しませんでした**

Pattern Matching は名前の通りパターンマッチを導入するためのプロポーザルです。

## For Stage 1

### [Function.prototype.once](https://github.com/tc39/proposal-function-once)

**Stage 1 に到達しました**

- https://docs.google.com/presentation/d/1M0bzEEBZGfb_gIDVjIytbfYnLUhG7EN9iUTx6KJE2po/edit#slide=id.gfacc5909b0_0_5

`Function.prototype.once` は、`Function` に一度だけ呼び出されるような関数を作るためのインスタンスメソッドを導入するプロポーザルです。

例を示します。関数 `f` は受け取った引数を出力し、それに2をかけた数を返す関数です。
このとき `f.once()` は、一度だけ `f` を呼び出す関数を返します。`f.once()` の返り値の関数を二度以上呼び出しても `f` が再度呼び出されることはなく、その返り値は最初の`f`の返り値となります。

```js
function f (x) { console.log(x); return x * 2; }

const fOnce = f.once();
fOnce(3); // `3` が出力され、`6` が返される
fOnce(3); // 何も出力されず、`6` が返される
fOnce(2); // 何も出力されず、`6` が返される
```

[プロポーザルのリポジトリでは実用的なユースケースが紹介されています。](https://github.com/tc39/proposal-function-once/tree/15c443d07d65fc0f20d4b17f3c11a78086029bc7#real-world-examples)

### [Type Annotations](https://github.com/tc39/proposal-type-annotations)

**Stage 1 に到達しました**

Type Annotations プロポーザルは、ECMAScript の仕様に TypeScript や Flow のような型の構文を導入するプロポーザルです。

たとえば、次に示すような型注釈を含むコードが JavaScript のプログラムとして妥当になります。

```ts
const foo: string = "foo";

function bar(param: number) {
  return param.isNaN();
}
```

このプロポーザルでは ECMAScript に型チェックを導入するのではなく、あくまで型の構文だけを導入します。つまり型による静的チェックを行う場合はこれまで通り統合開発環境やTypeScript Compilerなどを使う必要があります。

このプロポーザルについて以前記事を書いたので興味のある人はそちらも参照してください。

[JS に TS のような型注釈を書ける Type Annotations プロポーザル](https://sosukesuzuki.dev/posts/stage-1-type-annotations:embed)

また、過去に Harajuku.ts という勉強会で [@uhyo_](https://twitter.com/uhyo_) さんと [@okunokentaro](https://twitter.com/okunokentaro) さんと議論したので興味のある人はそのときのアーカイブも御覧ください。

https://youtu.be/eS51szIxGTQ

## Updates

### [Array Grouping](https://github.com/tc39/proposal-array-grouping)

- https://github.com/tc39/proposal-array-grouping/issues/37

### [Resizable Array Buffer](https://github.com/tc39/proposal-resizablearraybuffer)

- https://docs.google.com/presentation/d/1QBbEnfWn9QAn48J1SAm3l5xJARE5wcKt3MlTlcVKIek/edit#slide=id.p

### [Temporal](https://github.com/tc39/proposal-temporal)

- http://ptomato.name/talks/tc39-2022-03/

### [Shadow Realms](https://github.com/tc39/proposal-shadowrealm)

- https://docs.google.com/presentation/d/1Juv36nUTfcvb_E2NUeAPGuToCCBWIX0NLObx_h5qDYU/edit#slide=id.p

### [Pipe Operator](https://github.com/tc39/proposal-pipeline-operator)

- https://docs.google.com/presentation/d/1dDucwsW8qM22yWLr_NHFmAiAltQSht3AXYW00kET4GA/edit#slide=id.gfacc5909b0_0_5

### [Call-this operator](https://github.com/tc39/proposal-call-this)

- https://docs.google.com/presentation/d/1-MLGCibETPX8NiIvNJ1xOxiMS-NB8GCbDGNcB5patiU/edit#slide=id.gfacc5909b0_0_5

### [String.dedent](https://github.com/tc39/proposal-string-dedent)

- https://docs.google.com/presentation/d/1fF4TqU6eLcj74s0wa1VSq5wGORSY1m1naekTNF9JAz4/edit#slide=id.gc6f73a04f_0_0

## 参考リンク

- TC39
  - [agendas/03.md at main · tc39/agendas](https://github.com/tc39/agendas/blob/main/2022/03.md)
  - [notes/mar-28.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-03/mar-28.md)
  - [notes/mar-29.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-03/mar-29.md)
  - [notes/mar-30.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-03/mar-30.md)
  - [notes/mar-31.md at main · tc39/notes](https://github.com/tc39/notes/blob/main/meetings/2022-03/mar-31.md)
- Babel
  - [March 2022 · Issue #81 · babel/proposals](https://github.com/babel/proposals/issues/81)
- TypeScript
  - [TypeScript 4.8 Iteration Plan · Issue #49074 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/49074)
  - [Implement the updated JS decorators proposal · Issue #48885 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/48885)
- Unicode
  - [UTS #18: Unicode Regular Expressions](https://www.unicode.org/reports/tr18/)
