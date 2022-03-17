---
title: "Chrome99で実装された、セレクタの詳細度より優先されるCSS Cascade Layersについて"
author: "nus3"
createdAt: "2022-03-11"
summary: "モダンブラウザの最新バージョンで実装されたCSS Cascade Layersの紹介"
tags:
  - CSS
---

今月、[Chrome99 がリリース](https://developer.chrome.com/blog/new-in-chrome-99/)され、新機能として CSS Cascade Layers が実装されました。(このほかに Firefox97, Safari 15.4 でも実装されました)

## CSS Cascade Layers とは

これまで CSS の仕様では、どのスタイルを適用するかを、ざっくりと次のような順番で決定していました。(※カスケード順を省いて簡略的に記述しています)

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

## 複雑な詳細度の管理

どのスタイルを適用するか判断するのにセレクターの詳細度を用いる場合は、詳細度がより大きいものが適用されます。セレクターの詳細度の大きさは次のような順番で算出されます。(1 が大、3 が小)

1. ID セレクタ(`#example`)
2. クラスセレクタ:(`.example`)、属性セレクタ(`[type="radio"]`)、疑似クラス(`:hover`)
3. 要素型セレクタ(`h1`)と擬似要素(`::before`)

また、単純にセレクターの種類だけでなく、数も詳細度には影響します。

参考: https://specifishity.com/

上記のような詳細度の仕様は、CSS の記述量が増えていくにつれ、詳細度をうまく管理できず意図しないスタイルが適用されることがままあります。意図せぬスタイルが適用されないようにクラス名の命名規則を厳格にする[BEM](http://getbem.com/naming/)などの設計手法を取り入れて対応することもあります。しかし、命名規則をベースとした設計手法でもサードパーティの CSS ライブラリの使用など膨大な量の CSS になった場合、全てを通した詳細度の把握をすることはなかなか大変です。

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

また、セレクターの詳細度は ID > Class > 要素 の順に大きさが異なります。次のサンプルコードでは ID セレクターのスタイルが適用されます

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

`@layer`構文を使い、レイヤーを定義します。`@layer base, page, utilities;`の部分で各レイヤーでのスタイルの優先順位を定義することができます。この場合、各レイヤーで定義したスタイルは

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

しかし実際、v99 以降の Chrome で見てみると適用されるスタイルは`background-color: gold;`になります。これはセレクタの詳細度よりも Cascade Layers で指定したレイヤー順が優先されているからです。

[Chrome Dev](https://www.google.com/intl/ja/chrome/dev/)の DevTools で対象の要素をみると Cascade Layers が適用されているのがわかります。(※サンプルコードとはクラス名が違います。ややこしくてごめんなさい)

![DevToolsで確認すると実際にCascade Layersが適用されている](/frontend-expert/image/css-cascade-layers/devtools.png)

レイヤーの適用順が utilities > page > base になってるのがわかります。

## CSS フレームワークにも Cascade Layers は使える

Bootstrap や Materialize CSS、Bulma といった CSS フレームワークにも Cascade Layers を使うことができます。

CSS フレームワークの一つである[Bulma](https://bulma.io/)を使って試してみましょう。

本来、次のようなクラスをボタンに付与すると、Bulma で元から定義されている`.button.is-primary`が、後に追加した`.button-nus3`より詳細度が大きくなり、`.button-nus3`のスタイルは適用されません。

```html
<button class="button is-primary button-nus3">ボタン</button>
```

```css
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
@import "styles/page.css";
```

しかし次のサンプルコードのように Cascade Layers を使い、[Bulma](https://bulma.io/)を`base`のレイヤーにしつつ、画面特有のスタイルを`styles/page.css`に定義することで、詳細度を考えずに Bulma のスタイルを上書きすることができます。

```css
@layer base, page;

@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" layer(base);
@import "styles/page.css" layer(page);
```

もちろん、対象ブラウザのサポート状況は考慮する必要がありますが、CSS の記述量が増えることが想定されるプロジェクトには、Cascade Layers をベースにした設計を検討してみてはいかがでしょうか。

## 参考リンクなど

- https://developer.chrome.com/blog/cascade-layers/
- [サンプル実装したリポジトリ](https://github.com/nus3/p-css-cascade-layers)
