---
title: "Module Fragments"
author: "sakito"
createdAt: "2021-04-21"
updatedAt: "2021-04-21"
tags:
  - ECMAScript
  - JavaScript
  - Babel
---

現在 TC39 の 3 月のミーティングのアジェンダが GitHub にて公開されている([Link](https://github.com/tc39/agendas/blob/master/2021/03.md))。

それによると、Module Frangments という新しいプロポーザルが[@littledan](https://github.com/littledan)氏によって提案される予定だ。

この記事では、現在の Module Frangments の概要とモチベーション、構文について解説する。もしさらなる詳細に興味がある場合は https://github.com/littledan/proposal-module-fragments を読んでほしい。

また、Module Fragments は現在 Stage 0 の提案であり、今後仕様が大きく変わっていくことが予想されるのでその点には注意してほしい。

## 概要

Module Fragments はインラインで JavaScript のモジュールを定義するための構文を導入する提案である。詳細は後述するが、次のような構文を用いて一つのファイル内に複数のモジュールを定義し、import することができる。

```js
// filename: app.js
module "#count" {
  let i = 0;

  export function count() {
    i++;
    return i;
  }
}

module "#uppercase" {
  export function uppercase(string) {
    return string.toUpperCase();
  }
}

import { count } from "#count";
import { uppercase } from "#uppercase";

console.log(count()); // 1
console.log(uppercase("daniel")); // "DANIEL"
```

`module ~~` からのブロックが Module Fragments が導入する構文だ。`module`キーワードのあとにモジュール指定子を置き、そのあとにブロックを配置することでモジュールとして扱うことができる。そして、`import`宣言のモジュール指定子として使うことで定義したモジュールを import できる。

## モチベーション

Module Fragments は主に webpack や Rollup や Parcel などのモジュールバンドラーの出力として使われることを想定している。

現在では多くの開発者が ECMAScript Modules(ESM) を使って開発を行っている。数年前まではウェブブラウザがモジュールシステムを解釈できなかったため、モジュールバンドラーを使ってモジュールシステムをエミュレートして単一(もしくは複数)の JavaScript ファイルを出力するのがウェブ開発の主流になった。しかし多くのウェブブラウザが ESM を実装した現在でも、読み込み時のコストなどの実行効率の懸念からモジュールバンドラーが広く使われている。

しかしながら、モジュールバンドラーは ESM のセマンティクスを完全にエミュレートする必要があるため、その実装がかなり複雑になってしまう。また、ESM に関連する仕様はこれからも増えていくことが予想される。たとえば、[top-level await](https://github.com/tc39/proposal-top-level-await)や[Import Assertions](https://github.com/tc39/proposal-import-assertions)などのモジュールに関する仕様が ECMAScript に追加されるたびに各モジュールバンドラーはそれらをエミュレートするための実装を行う必要がある。

さらに V8 や JavaScriptCore などの実際にウェブブラウザなどで動作する JavaScript エンジンは、バンドルされたあとのコードを実行することになるので開発者が記述したままのモジュール構造を見ることができない。そのためモジュールの構造を利用した最適化ができずパフォーマンスに悪影響を及ぼすことがある。

Module Fragments は実行時のオーバーヘッドが低いためバンドラーの出力として使うことができ、以前に比べてモジュールバンドラーがエミュレートするべきモジュールの仕様を減らすことができる。また、モジュールバンドラーはモジュールの構造をそのまま吐き出すことができるようになるので、JavaScript エンジンはその構造を見ることができるようになる。

## 構文

Module Fragments では import ステートメントや export ステートメントのようなモジュールのトップレベルに配置できる新しい非終端記号を導入する。ECMAScript の仕様で言えば[Module Item](https://tc39.es/ecma262/#prod-ModuleItem)に新しいステートメントが追加されるということになる。

```js
module "#m" {}
```

また Module Fragments をネストすることはできず、必ずトップレベルで宣言する必要がある。

```js
// NG
module "#m1" {
  module "#m2" {}
}
```

ECMAScript のプロポーザルについて調べたことがある人なら、[Module Blocks](https://github.com/tc39/proposal-js-module-blocks)という現在 Stage 2 のプロポーザルで提案されている構文と似ていることに気がつくかもしれない。Module Fragments も Module Blocks も`module`というキーワードを使うが、Module Blocks ではモジュール指定子を指定せずに`module`の後にすぐ`{`がくるので構文的に衝突することはない。

```js
// Module Blocks
const m = module {};

// Module Fragments
module "#m" {}
```

Module Fragments が実行されるランタイムがブラウザの場合、`module` キーワードのあとに続くモジュール指定子を表す文字列は `#` から始まる URL フラグメントで使える文字列である必要がある(つまり ASCII 文字列)。この指定子を使って絶対または相対 URL として Module Fragments で定義されたモジュールを import できる。

```js
// In https://example.com/bundle.js
module "#counts" {
  let i = 0;

  export function count() {
    i++;
    return i;
  }
}
```

```js
import { count } from "https://example.com/bundle.js#counts";
```

なおこれは ECMAScript の仕様ではなくブラウザに限定された規則である。そのため、例えば Node.js や Deno などの別のホストがこれに従う必要はない。しかし、それらのホストでも必要に応じてこの規則に従うことが推奨されている。

## おわりに

筆者がこの提案を見たときは Module Blocks と構文上の類似点が気になったが、この 2 つは全く異なるモチベーションで提案された提案である。

Module Blocks は、Worker コンストラクタなどにそのままモジュールを渡すことで Web Workers などの利便性を向上させるなどの目的があるが、Module Fragments はバンドルのチューニングの目的で使われることになるのだろう。

そのため一般のウェブアプリケーション開発者が直接 Module Fragments を使うことは少ないように思うが、ライブラリ開発者やウェブアプリケーションのバンドルのチューニングを行う開発者は将来的には把握しておく必要がありそうだ。

個人的には、先日提案された[Deferring Module Evaluation](https://github.com/tc39/proposal-defer-import-eval)や、Module Blocks、そしてこの Module Fragments などモジュールのパフォーマンスや利便性を向上させるための提案が続々と出てきているのは興味深い。ESM 自体が安定して使われるようになってきた今、そのパフォーマンスや利便性が気になるフェーズになってきたということだろうか。
