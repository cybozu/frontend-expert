---
title: "Chrome99で実装された、セレクタの詳細度より優先されるCSS Cascade Layersについて"
author: "nus3"
createdAt: "2022-03-11"
summary: "モダンブラウザの最新バージョンで実装されたCSS Cascade Layersの紹介"
tags:
  - CSS
---

先日、[Chrome99 がリリース](https://developer.chrome.com/blog/new-in-chrome-99/)され、新機能として CSS Cascade Layers が実装されました。(このほかに Firefox97, Safari 15.4 でも実装されました)

## CSS Cascade Layers とは

これまでブラウザはどの CSS を適用するかを次のような順番で決定していました。

1. `!important`
2. インラインスタイル
3. セレクターの詳細度
4. 同じ詳細度であれば最後に宣言されたもの

CSS Cascade Layers が導入されると次のような順番に変わります。

1. `!important`
2. インラインスタイル
3. **Cascade Layers**
4. セレクターの詳細度
5. 同じ詳細度であれば最後に宣言されたもの

## 複雑な詳細度

ブラウザがどのスタイルを適応するか判断するのにセレクターの詳細度を用いる場合は、詳細度がより大きいものが適用されます。セレクタの詳細度の大きさは次のような順番で算出されます。

1. ID セレクタ(`#example`)
2. クラスセレクタ:(`.example`)、属性セレクタ(`[type="radio"]`)、疑似クラス(`:hover`)
3. 要素型セレクタ(`h1`)と擬似要素(`::before`)

また、単純にセレクターの種類だけでなく、数も詳細度には影響します。

参考: https://specifishity.com/

上記のような詳細度の仕様は、CSS の記述量が増えていくにつれ、詳細度をうまく管理できず意図しないスタイルが適応されることがままあります。意図せぬスタイルが適応されないように[BEM](http://getbem.com/naming/)などのクラスに対して命名ルールを決めて対応することもあります。しかし、BEM を取り入れたとしてもサードパーティの CSS ライブラリの使用など膨大な CSS のコード量になった場合、全てを通した詳細度の把握をすることはなかなか大変です。

## Cascade Layers を入れるとどうなるのか

Cascade Layers を導入すると、セレクターの詳細度よりも優先したレイヤーを定義することができるようになります。実際にコードで見てみましょう。

### 通常の詳細度を使ったスタイルの適用

同じ詳細度の場合、最後に宣言されたスタイルが適用されます。

```html
<button class="base nus3">royalblueになる</button>
```

```css
.base {
  background-color: crimson;
}
.nus3 {
  background-color: white;
}
.base {
  background-color: royalblue; /* このスタイルが適用されます */
}
```

セレクタの詳細度は ID > Class > 要素 なので ID セレクタのスタイルが適用されます

```html
<button id="btn" class="nus3">crimsonになる</button>
```

```css
button {
  background-color: coral;
}
#btn {
  background-color: crimson; /* このスタイルが適用されます */
}
.nus3 {
  background-color: black;
}
```

### Cascade Layers を使ったスタイルの適用

`@layer`の構文を使い layer を定義します。`@layer base, page, utilities;`の部分で各 layer でのスタイルの優先順位を定義することができます。この場合は各 layer で定義したスタイルは

1. utilities
2. page
3. base

の順に適用されます。

サンプルコードで詳しく見てみましょう。

次のコードでは、`@layer`の記述を無視した場合、一つ目のボタンでは最後に宣言したクラスセレクタである`.nus3`のスタイルが適用され、`background-color: white;`になります。また二つ目のボタンではより詳細度の大きい ID セレクタの`#btn`のスタイルが適用され、`background-color: crimson;`になります。

```html
<button class="base nus3">goldになる</button>
<button id="btn" class="nus3">goldになる</button>
```

```css
/* この部分は省略可能。省略した場合はlayer宣言した順番がスタイルの優先順になる(最後に宣言したものが一番優先される) */
@layer base, page, utilities;

@layer base {
  .base {
    background-color: crimson;
  }

  .nus3 {
    background-color: white;
  }
}

@layer page {
  #btn {
    background-color: crimson;
  }
}

@layer utilities {
  button {
    background-color: gold;
  }
}
```

しかし実際、v99 以降の Chrome で見てみると当たってるスタイルは`background-color: gold;`になります。これはセレクタの詳細度よりも Cascade Layers で指定した layer 順が優先されているからです。

[Chrome Dev(Chrome の Develop 版)](https://www.google.com/intl/ja/chrome/dev/)の DevTools で対象の要素に当たってるスタイルみると Cascade Layers が適用されているのがわかります。(※サンプルコードとはクラス名が違います。ややこしくてごめんなさい)

![devtoolsで実際に当たっているスタイル](/frontend-expert/image/css-cascade-layers/devtools.png)

## サードパーティの CSS ライブラリにも Cascade Layers は使える

## まとめ

今回の各ブラウザの実装状況も踏まえ、CSS が記述量が増えてくるようなプロジェクトには、命名規則をベースにした設計だけでなく、今後は Cascade Layers をベースにした設計も考えてみてもいいかもしれません。

## 参考リンク

- https://developer.chrome.com/blog/cascade-layers/
- https://ishadeed.com/article/cascade-layers/
- https://caniuse.com/css-cascade-layers
- https://specifishity.com/
- https://www.w3schools.com/cssref/css_selectors.asp

## 雑メモ

- layer 宣言がファイルの先頭
- 同じクラス名の場合、後に呼ばれたものが反映される
  - クラス名が被らないよう(被ってもいいように)、スコープを使ったり BEM 要素を使用したりしてた
- サードパーティの CSS のクラス名を important してる場合は、カスケードレイヤー使えばいい
- 擬似要素も含めた

セレクターの詳細度(specificity)を大きい順に並べると

1. !important
2. インラインスタイル
3. ID セレクタ
4. クラスセレクタ
5. 要素型セレクタ

- [CSS セレクタの結合子](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Selectors#%E7%B5%90%E5%90%88%E5%AD%90)
- 子孫結合(Descendant combinator): 空白での結合。子、孫要素のことを表す
- セレクターのクラス間が空白の場合は親子、ドット繋がりの場合は and、`,`の場合は or

[色名の検索に使ってる](https://www.colordic.org/)
