---
title: "ES2022 と TypeScript 4.5 に入るプライベートフィールドのための in 演算子について"
author: "sosukesuzuki"
createdAt: "2021-11-11"
summary: "ES2022 と TypeScript 4.5 に入る現在 Stage 4 の提案 Ergonomic brand checks for Private Fields についての解説です。"
tags: ["ECMAScript", "TypeScript"]
---

2021年7月に行われた TC39 ミーティングで [Ergonomic brand checks for Private Fields](https://github.com/tc39/proposal-private-fields-in-in) というプロポーザルが Stage 4 になりました。
このプロポーザルは、ES2022 に含まれる予定です。また、[TypeScript 4.5 にも含まれる予定です](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-rc/#private-field-presence-checks)。

この記事では、Ergonomic brand checks for Private Fields について解説します。

## 概要

Ergonomic brand checks for Private Fields は、`in` 演算子を使ったプライベートフィールドの有無の判定を可能にするプロポーザルです。

### 現在の `in` 演算子

`in` 演算子は、オブジェクトが特定の名前のプロパティを持っているかどうかを判定するための二項演算子です。
左辺にプロパティの名前、右辺にオブジェクトを受け取ります。

```js
const obj = { prop1: 1 };
console.log("prop1" in obj); // true
```

### 新しい `in` 演算子

Ergonomic brand checks for Private Fields では、この `in` 演算子を拡張し、左辺に Private Identifier を取れるようになります。

Private Identifier は `#foo` のような形をした特別な識別子で、クラスのプライベートフィールドを表現するのに使われます。

たとえば、次のコードではクラス `Foo` は、`#prop1` というプライベートフィールドを持ちます。
このとき `#prop1` は Private Identifier です。

```js
class Foo {
  #prop1;
}
```

拡張された `in` 演算子では、次のようにしてオブジェクトにプライベートフィールドが含まれるかどうかをチェックできます。

```js
#prop1 in obj
```

しかし、プライベートフィールドはプライベートなので上記のコードはそのフィールドを持つクラスの中でのみ使うことができます。

つまり、次のようにクラスの外でプライベートフィールドに対して `in` を使うとエラーになります。

```js
class Foo {
  #prop1;
}
console.log(#prop1 in new Foo());
// Uncaught SyntaxError: Private field '#prop1' must be declared in an enclosing class
```

しかし、次のようなコードはエラーになりません。メソッド `foo` はクラス `Foo` の中にあるので、Private Identifier である `#foo` を `in` 演算子の左辺として使うことができます。
そして、この `foo` の中で `this` は `Foo` のインスタンスであり、それには当然 `#prop1` というプライベートプロパティが存在するので、`#prop1 in this` の結果は `true` になります。

```js
class Foo {
  #prop1;
  foo() {
    return #prop1 in this;
  }
}
console.log(new Foo().foo()); // true
```

## モチベーション

存在しないプライベートフィールドにアクセスすると、実行時エラーが発生します。

その挙動と try / catch を組み合わせて、次のようにしてオブジェクトのクラスを判定できます。

```js
class Foo {
  #brand;
  static isFoo(obj) {
    try {
      obj.#brand;
      return true;
    } catch {
      return false;
    }
  }
}
```

`obj.#brand` にアクセスしたとき、`obj` が Foo のインスタンスでない場合、実行時エラーが発生し `catch` に入り `false` が返されます。
このようにして、あるオブジェクトが`Foo`のインスタンスであるかを検証するスタティックメソッドを作れます。

ですが、このパターンは冗長です。`in` 演算子を使えばもっと短く書けます。

```js
class Foo {
  #brand;
  static isFoo(obj) {
    return #brand in obj;
  }
}
```

これが、このプロポーザルの主なモチベーションです。

[`instanceof` 演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/instanceof)も基本的にはこの目的のために使えます。しかし `instanceof` 演算子はプロトタイプに依存するので、プロトタイプを書き換えることでその挙動を変更できます。

次の例では、 `obj` は `Foo` のインスタンスではありませんが、後からプロトタイプを書き換えているので `obj instanceof Foo` は `true` になっています。

```js
class Foo {}
const foo = new Foo();
const obj = {};
Object.setPrototypeOf(obj, foo);
console.log(obj instanceof Foo); // true
```

また、[Symbol.hasInstance](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance) を使って `instanceof` の挙動を変更することも可能です。

なので、より安全にオブジェクトのもとになったクラスを検証したい場合は `in` 演算子を使うと良いでしょう。

## 参考リンク

- https://tc39.es/ecma262/#prod-RelationalExpression
- https://tc39.es/ecma262/#prod-PrivateIdentifier
- https://github.com/tc39/proposal-private-fields-in-in
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/in
