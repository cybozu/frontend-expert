---
title: "CSS Cascasde Layersの追加など、Chrome 99 リリースノートまとめ"
author: "Saji"
editor: "nus3"
createdAt: "2022-03-18"
summary: "Chrome 99 のリリースノートの要約です"
tags:
  - Releasenote
  - Browser
---

Chrome 99 のリリースノート関連の情報をまとめました。

- https://developer.chrome.com/blog/new-in-chrome-99/
- https://developer.chrome.com/blog/new-in-devtools-99/
- https://developer.chrome.com/blog/deps-rems-99/
- https://www.chromestatus.com/features#milestone%3D99
- https://v8.dev/blog/v8-release-99

## New In Chrome (Chrome 99)

Chrome99 で新しく追加された機能です。

### Chrome 100 and Firefox 100

<!-- saji -->

### CSS Cascasde Layers

CSS Cascade Layers が Chrome99、Firefox 97、Safari 15.4 Beta でサポートされました！

CSS セレクタの詳細度を上回るルールを`@layer`で定義することができるようになります。

<!-- TODO: 詳細の記事をFEEチームのブログに書く -->

参考:

https://developer.chrome.com/blog/cascade-layers/

### showPicker() for input elements

<!-- saji -->

### And more!

`CanvasRenderingContext2D`に次の機能が追加されました。

- Context がロストした時や復元した時のイベントハンドリングができるように(`ContextLost`, `ContextRestored`)
- `willReadFrequently`オプションの追加
- `letter-spacing`など Canvas でサポートされていなかったテキストを修飾するプロパティの追加
- Canvas の状態をリセットする`reset()`など

PWA のマニフェストにダークテーマに対応する設定が追加できる[オリジントライアル](https://developer.chrome.com/origintrials/#/view_trial/4239013149262479361)が開始されたました。

また詳細はこの記事の後半に記載しますが、Handwriting Recognition API が使えるようになります。

## What's New In DevTools (Chrome 98)

DevTools についてはこちらの日本語訳を参照ください。

https://developer.chrome.com/ja/blog/new-in-devtools-99/

書いてるうちにでなかったら、気になるものがあれば記載する

## Deprecations and removals in Chrome 99

### Remove Battery Status API on insecure origins

<!-- saji -->

内容

### Remove font-family -webkit-standard

`font-family`の値として`-webkit-standard`が削除されました。

### Remove GamepadList

接続しているゲームパッドを取得できる`navigator.getGamepads()`の返り値が`GamepadlList`から`Gamepad`のオブジェクトの配列を返すようになりました。

この変更により、Gecko と Webkit と同じく仕様と一致するようになります。

参考:

[Chrome でゲームパッドを使う方法](https://web.dev/gamepad/)

### Update WebCodecs to match the specification

<!-- saji -->

内容

## その他 Chrome Platform Status に記載されていたもの

### Feature: "paintworklet" destination for PaintWorklet

[CSS Houdini](https://developer.mozilla.org/en-US/docs/Web/Guide/Houdini)の一部である[CSS Painting API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API)で使われる PaintWorklet のリクエストの送り先が`script`から`paintworklet`になりました。

`Sec-Fetch-Dest`HTTP リクエストヘッダと`FetchEvent.request.destination`で適用されます。

### Feature: Allow infinity, -infinity and NaN in CSS calc()

<!-- saji -->

### Autofill in ShadowDOM

<!-- saji -->

### Convert adoptedStyleSheets to use ObservableArray

document や shadowRoot に[CSSStyleSheet](https://developer.mozilla.org/ja/docs/Web/API/CSSStyleSheet)を追加できる`adoptedStyleShetts`で ObservableArray が使えるようになります。

今回から push などの通常の配列操作ができるようになります。

```js
document.adoptedStyleSheets = [...adoptedStyleSheets, newSheet]; // これまで
document.adoptedStyleSheets.push(newSheet); // これから
```

### Handwriting Recognition API

<!-- saji -->

### Origin Private File System extension: AccessHandle

<!-- saji -->

### Unprefixed text-emphasis properties

CSS の text-emphasis プロパティが`-webkit`なしで使えるようになります。

参考:

https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis

### Window Controls Overlay for Installed Desktop Web Apps

<!-- saji -->

## V8 release v9.9

### Intl.Locale extensions

Intl.Local オブジェクトに 7 つの新しいプロパティが追加されました。

`calendars`, `collations`, `hourCycles`, `numberingSystems`, `timeZones`では他の Intl API で使用する好ましい識別子を返します。

```js
const jaLocal = new Intl.Locale("ja");
console.log(jaLocal.calendars); // ['gregory', 'japanese']
console.log(jaLocal.collations); // ['unihan', 'emoji', 'eor']
console.log(jaLocal.hourCycles); // ['h23']
console.log(jaLocal.numberingSystems); // ['latn']
```

`textInfo`はテキストに関連する情報をオブジェクトで返します。現状では CSS の direction プロパティで使用するような文字の並び順の値を返します。
(rtl が右から左へ、ltr が左から右へ)

```js
arabicEgyptLocale.textInfo;
// { direction: 'rtl' }
japaneseLocale.textInfo;
// { direction: 'ltr' }
chineseTaiwanLocale.textInfo;
// { direction: 'ltr' }
```

`weekInfo`は週に関連する情報を返します。

```js
const jaLocal = new Intl.Local("ja");
console.log(jaLocal.weekInfo);

// 返される数字は 1 が月曜日、7 が日曜日
// {
//   firstDay: 7,
//   weekend: [6, 7],
//   minimalDays: 1,
// }
```

### Intl Enumeration

<!-- saji -->
