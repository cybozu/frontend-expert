---
title: "TC39 meeting 86th の概要と注目ポイント"
author: "sosukesuzuki"
editor: "nakajmg"
createdAt: "2021-10-21"
summary: ""
tags:
  - TC39
---

TC39 の 86 回目の meeting が 10/25 ~ 10/28 に開催されます。

議題として上げられている中から、ステージの変更や注目している仕様について紹介します。

- [agendas/10.md at master · tc39/agendas](https://github.com/tc39/agendas/blob/master/2021/10.md)

## for Stage 4

### [Error Cause](https://github.com/tc39/proposal-error-cause)

```js
function doWork() {
  try {
    doSomeWork();
  } catch (err) {
    throw new Error("Some work failed", { cause: err });
  }
  try {
    doMoreWork();
  } catch (err) {
    throw new Error("More work failed", { cause: err });
  }
}
```

## for Stage 3

Stage 3 の仕様はありません。

## for Stage 2

### [Array Grouping](https://github.com/tc39/proposal-array-grouping)

```js
const array = [1, 2, 3, 4, 5];
array.groupBy((i) => {
  return i % 2 === 0 ? "even" : "odd";
});
// =>  { odd: [1, 3, 5], even: [2, 4] }
```

### [Partial Application](https://github.com/tc39/proposal-partial-application)

```js
const add = (x, y) => x + y;
const addOne = add~(1, ?);
addOne(2); // 3
```

## for Stage 1

### [`String.cooked`](https://github.com/bathos/proposal-string-cooked)

```js
String.cooked`mmm ... \u0064elicious cooked string`;
// → "mmm ... delicious cooked string"
```

### [Destructure Private Fields](https://github.com/jridgewell/proposal-destructuring-private)

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

```js
Object.prototype.hasOwnProperty.call({ foo: "foo" }, "foo"); // true
({ foo: "foo" }::Object.prototype.hasOwnProperty("foo")); // true
```

### [Function helpers](https://github.com/js-choi/proposal-function-helpers)

```js
const f = Function.flow(f0, f1, f2);
f(5, 7); // f2(f1(f0(5, 7))).
```

```js
Function.pipe(5, f0, f1, f2); // f2(f1(f0(5))).
```

```js
const f = Function.constant(3);
f("fooo"); // 3
f(3009, 33, 44); // 3
f({ foo: "foo" }); // 3
```

```js
Function.identity(3); // 3
Function.identity(4, 5); // 4
```

```js
const f = Function.tap(console.log);
f(5); // 5 を出力して、5 を返す
```

### [Evaluator Attributes](https://github.com/lucacasonato/proposal-evaluator-attributes)

```js
import mod from "./foo.wasm" as "wasm-module";
mod instanceof WebAssembly.Module; // true
```

### RegExp Features

前回のミーティングで提案された[RegExp Features](https://github.com/rbuckton/proposal-regexp-features)が機能ごとに別々の提案に分割されました。

- [RegExp Modifiers](https://github.com/rbuckton/proposal-regexp-modifiers)
- [RegExp Conditionals](https://github.com/rbuckton/proposal-regexp-conditionals)
- [RegExp Extended Mode and Comments](https://github.com/rbuckton/proposal-regexp-x-mode)
- [RegExp Atomic Operators](https://github.com/rbuckton/proposal-regexp-atomic-operators)
- [RegExp `\R` Escape](https://github.com/rbuckton/proposal-regexp-r-escape)
- [RegExp Buffer Boundaries](https://github.com/rbuckton/proposal-regexp-buffer-boundaries)

### Updates

- [Change Array by Copy](https://github.com/tc39/proposal-change-array-by-copy)
- [JSON.parse sourct text access](https://github.com/tc39/proposal-json-parse-with-source)
- [Records & Tuples](https://github.com/tc39/proposal-record-tuple/)
- [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management)
- [JS Module Blocks](https://github.com/tc39/proposal-js-module-blocks)
- [Array.fromAsync](https://github.com/js-choi/proposal-array-from-async)

## その他

- [Extending null](https://github.com/tc39/ecma262/pull/1321)
