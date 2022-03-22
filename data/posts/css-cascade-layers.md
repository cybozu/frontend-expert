---
title: "主要ブラウザで使える！CSS Cascade Layers で新しいCSS設計の手法を考える"
author: "nus3"
editor:
  - "nakajmg"
createdAt: "2022-03-22"
summary: "CSS Cascade Layersを使ったスタイルの管理方法について紹介します"
tags:
  - CSS
---

[Chrome99](https://developer.chrome.com/blog/new-in-chrome-99/)に新機能として CSS Cascade Layers が実装され、Firefox、Edge、Safari といった主要ブラウザで CSS Cascade Layers が使えるようになりました。

## CSS Cascade Layers とは

CSS の仕様において、要素にどのスタイルを適用するかはざっくりと次のような優先順位で決定されていました。(カスケード順を省いて簡略的に記述しています)

1. `!important`
2. インラインスタイル
3. セレクターの詳細度
4. 同じ詳細度であれば最後に宣言されたもの

ここに CSS Cascade Layers が導入されると次のように変わります。

1. `!important`
2. インラインスタイル
3. **Cascade Layers**
4. セレクターの詳細度
5. 同じ詳細度であれば最後に宣言されたもの

## 従来の CSS が抱える複雑な詳細度の管理

どのスタイルを適用するか判断するのにセレクターの詳細度を用いる場合は、詳細度がより高いものが適用されます。

セレクターの詳細度は、高い順に次のような順番になります。

1. ID セレクター: `#example`
2. クラスセレクター: `.example`, 属性セレクター: `[type="radio"]`, 疑似クラス: `:hover`
3. 要素型セレクター: `h1`, 擬似要素: `::before`

また、単純にセレクターの種類だけでなく、セレクターの数も詳細度に影響します。

参考: https://specifishity.com/

CSS の記述量が増えていくにつれ、この詳細度をうまく管理できず意図しないスタイルが適用されることがままあります。意図しないスタイルが適用されないために、セレクターの命名規則を厳格にする[BEM](http://getbem.com/naming/)などの設計手法を取り入れて対応することもあります。

しかし、命名規則をベースとした設計手法では、サードパーティの CSS ライブラリを使用する場合や、コントロールが難しいくらい多い記述量の CSS になってしまった場合、全体の詳細度を把握して管理することはなかなか大変です。

## Cascade Layers によってどう変わるか

Cascade Layers を使うと、セレクターの詳細度よりも優先してスタイルが適用されるレイヤーを定義できるようになります。

実際にコードで見てみましょう。

### 通常の詳細度を使ったスタイルの適用

Cascade Layers を使わない場合、同じ詳細度のセレクターは属性値での記述順に関わらず、スタイルシート内で最後に宣言されたスタイルが適用されます。

次の場合、`.base` と `.nus3` は同一の詳細度です。また、1 つ目の `.base` は最後に記述されている `.base` によって上書きされます。このボタンには`style`内で一番最後に記述されている `.base` のスタイルが適用され、背景色が `royalblue` になります。

```html
<style>
  .base {
    background-color: crimson;
  }
  .nus3 {
    background-color: white;
  }
  .base {
    background-color: royalblue; /* このスタイルが適用される */
  }
</style>

<button class="base nus3">royalblueになる</button>
```

また、セレクターの詳細度は種類によって異なり、要素セレクター &lt; クラスセレクター &lt; ID セレクター の順に高くなります。

次の場合、ID セレクター(`#btn`)のほうがクラスセレクター(`.nus3`) や要素セレクター(`button`)よりも詳細度が高いので、`#btn` のスタイルが適用されます。

```html
<style>
  button {
    background-color: coral;
  }
  #btn {
    background-color: crimson; /* このスタイルが適用される */
  }
  .nus3 {
    background-color: black;
  }
</style>
<button id="btn" class="nus3">crimsonになる</button>
```

### Cascade Layers を使ったスタイルの適用

Cascade Layers では、まず`@layer`構文を使ってレイヤーを定義します。

```css
`@layer base, page, utilities;`
```

このとき、base、page、utilities の 3 つのレイヤーを定義するとともに、レイヤーの優先順位を定義しています。

この場合、各レイヤーのスタイルは後ろに定義したものほど優先度が高く、次のような優先度でスタイルが適用されます。

1. utilities
2. page
3. base

ここではレイヤーの定義と優先度を同時に定義していますが、この記述を省略した場合、あとに定義したレイヤーの優先度が高くなります。

レイヤーの動作についてサンプルコードで詳しく見てみましょう。

次のコードは、前述したコードをベースに `@layer` を追加したものです。

```html
<style>
  @layer base, page, utilities;

  @layer utilities {
    .shiny {
      background-color: gold;
    }
  }

  @layer page {
    #btn {
      background-color: crimson;
    }
  }

  @layer base {
    .base {
      background-color: crimson;
    }

    .nus3 {
      background-color: white;
    }
  }
</style>

<button class="shiny base nus3">goldになる</button>
<button id="btn" class="shiny">goldになる</button>
```

１つ目のボタンはレイヤーがない場合には最後に宣言されている `.nus3` の `white` が適用されていましたが、優先度の高い utilities レイヤーに定義した `.shiny` の `gold` が適用されます。

２つ目のボタンはレイヤーがない場合には ID セレクターの `#btn` のスタイルが適用されていましたが、この場合も utilities レイヤーに定義した `.shiny` のほうが優先度が高いため、 `gold` が適用されます。

次のサンプルページを開いて、DevTools で対象の要素をみると Cascade Layers が適用されているのがわかります。

[サンプルページ](https://c1r38o.csb.app/)

![DevToolsで確認すると実際にCascade Layersが適用されている](/frontend-expert/image/css-cascade-layers/devtools.png)

レイヤーの適用順が utilities > page > base になってるのがわかります。

このように、Cascade Layers を使うことで、詳細度ではなくレイヤーでスタイルをコントロールできるようになります。

### Cascade Layers 内で`!important`を使った際のスタイルの優先順位

`!important`を使っていない場合、Cascade Layers で定義したレイヤー外のスタイルが優先して適用されます。

これはカスケード順が、レイヤー内 &lt; レイヤー外 の順に高くなっているからです。

次のコードでは、レイヤー外のスタイルが適用され、ボタンの背景色が`white`になります。

```html
<style>
  @layer base {
    .nus3 {
      background-color: gold;
    }
  }

  .nus3 {
    background-color: white; /* このスタイルが適用される */
  }
</style>

<button class="nus3">whiteになる</button>
```

しかし、`!important`を使ったスタイルの場合、このカスケード順が変わるので注意が必要です。

```html
<style>
  @layer base {
    .nus3 {
      background-color: gold !important; /* このスタイルが適用される */
    }
  }

  .nus3 {
    background-color: white !important;
  }
</style>

<button class="nus3">goldになる</button>
```

## CSS フレームワークにも Cascade Layers は使える

Bootstrap や Materialize CSS、Bulma といった CSS フレームワークにも Cascade Layers を使ってレイヤーを定義できます。

CSS フレームワークの一つである[Bulma](https://bulma.io/)を使って試してみましょう。

本来、次のようなクラスをボタンに付与すると、Bulma で元から定義されている`.button.is-primary`が、後に追加した`.button-nus3`より詳細度が高くなり、`.button-nus3`のスタイルは適用されません。

```html
<button class="button is-primary button-nus3">ボタン</button>
```

```css
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
@import "styles/page.css";

/* styles/page.cssで定義されているスタイル */
.button-nus3 {
  background-color: gold;
}
```

しかし次のように Cascade Layers を使い、[Bulma](https://bulma.io/)の CSS を`base`のレイヤーにしつつ、画面特有のスタイルを`styles/page.css`に定義することで、詳細度の影響を気にすることなく Bulma のスタイルを上書きすることができます。

```css
@layer base, page;

@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" layer(base);
@import "styles/page.css" layer(page);
```

対象ブラウザのサポート状況は考慮する必要がありますが、CSS の記述量が増えることが想定されるプロジェクトには、Cascade Layers をベースにした設計を検討してみてはいかがでしょうか。

## 参考リンクなど

- https://www.w3.org/TR/css-cascade-5/
- https://developer.mozilla.org/en-US/docs/Web/CSS/@layer
- https://developer.chrome.com/blog/cascade-layers/
- [サンプル実装したリポジトリ](https://github.com/nus3/p-css-cascade-layers)
