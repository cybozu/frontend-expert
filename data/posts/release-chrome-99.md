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

Chrome 100 は今年の 3 月下旬、Firefox100 は 5 月上旬にリリースされます。 これらは両方ともメジャーバージョン番号が 3 桁にロールオーバーするアップデートです。 UserAgent をパースしたバージョン番号を２桁として解釈しているコードがある場合、新しいバージョン番号によって問題が発生する可能性があります。

Chrome では、`＃force-major-version-to-100` フラグを有効にすることで現在のバージョンを 100 に上書きし、挙動を確認することができます。

また、Firefox Nightly では「設定」メニューで、「Firefox100 ユーザーエージェント文字列」オプションを有効にすることで同様の確認が可能です。 両ブラウザでバージョン番号の解釈が期待どおりに機能することを確認できるように、サイトをテストすることをお勧めします。

### CSS Cascasde Layers

CSS Cascade Layers が Chrome99、Firefox 97、Safari 15.4 Beta でサポートされました！

CSS セレクタの詳細度を上回るルールを`@layer`で定義することができるようになります。

詳細は [@nus3](https://twitter.com/nus3_) が別途記事を書いたので次のリンクをご参考ください。

https://cybozu.github.io/frontend-expert/posts/css-cascade-layers

### showPicker() for input elements

HTML InputElements に新しく`showPicker（）`メソッドが実装されました。

これにより、日付だけでなく、時間、色、その他の`<input>`要素でブラウザーピッカーを表示するための標準的な方法が整備されました。

利用する場合は、以下のように`<input>`要素で`showPicker（）`を呼び出します。また`try…catch`ブロックでこれらの処理を囲う事で、ブラウザーが`showPicker()`の API をサポートしていない場合、またはピッカーを表示できない場合のフォールバックを提供できます。

```js
const button = document.querySelector("button");
const dateInput = document.querySelector("input");

button.addEventListener("click", () => {
  try {
    dateInput.showPicker();
    // Dateピッカーの表示.
  } catch (error) {
    // ピッカーを表示できない場合のフォールバック
  }
});
```

参考:

[Show a browser picker for date, time, color, and files](https://developer.chrome.com/blog/new-in-chrome-99/#:~:text=Show%20a%20browser%20picker%20for%20date%2C%20time%2C%20color%2C%20and%20files)

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

`Battery Status API`は、HTTP ページや HTTP ページに埋め込まれた HTTPS の iframe などの安全でないオリジンでサポートされなくなりました。

### Remove font-family -webkit-standard

`font-family`の値として`-webkit-standard`が削除されました。

### Remove GamepadList

接続しているゲームパッドを取得できる`navigator.getGamepads()`の返り値が`GamepadlList`から`Gamepad`のオブジェクトの配列を返すようになりました。

この変更により、Gecko と Webkit と同じく仕様と一致するようになります。

参考:

[Chrome でゲームパッドを使う方法](https://web.dev/gamepad/)

### Update WebCodecs to match the specification

WebCodecs 仕様変更により、仕様に反していた以下の 2 つの部分について修正しました。

- `EncodeVideoChunkMetadata`オブジェクト内の`temporalLayerId`の場所
- `VideoFrame()` コンストラクタでタイムスタンプ引数を指定しなかった際の挙動変更

詳しくは[こちら](https://chromestatus.com/feature/5667793157488640)を参照してください。

## その他 Chrome Platform Status に記載されていたもの

### Feature: "paintworklet" destination for PaintWorklet

[CSS Houdini](https://developer.mozilla.org/en-US/docs/Web/Guide/Houdini)の一部である[CSS Painting API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API)で使われる PaintWorklet のリクエストの送り先が`script`から`paintworklet`になりました。

`Sec-Fetch-Dest`HTTP リクエストヘッダと`FetchEvent.request.destination`で適用されます。

### Feature: "audioworklet" destination for AudioWorklet

`Web Audio API`のオーディオ処理を別スレッドで実行する仕組みである、`AudioWorklet`のリクエストの送り先が`script`から`audioworklet`になりました。

`Sec-Fetch-Dest`HTTP リクエストヘッダと`FetchEvent.request.destination`で適用されます。

### Feature: Allow infinity, -infinity and NaN in CSS calc()

CSS の`calc()`関数で`infinity`, `-infinity`, `NaN` などのキーワード、及び`calc(1/0)` のように`infinity`や`NaN`に評価される式による値を許容するようになりました。

### Autofill in ShadowDOM

`autofill`が`form` 要素内のフォームコントロールを収集する際に、`ShadowDOM`も参照するようになります。これにより`Shadow DOM`内部の入力フォームでも`autofill`が効くようになります。

Web コンポーネントを採用する際、`input`要素のようなフォームコントロールを`ShadowDOM`で包むことが一般的になっていることを受けての改善となります。

### Convert adoptedStyleSheets to use ObservableArray

document や shadowRoot に[CSSStyleSheet](https://developer.mozilla.org/ja/docs/Web/API/CSSStyleSheet)を追加できる`adoptedStyleShetts`で ObservableArray が使えるようになります。

今回から push などの通常の配列操作ができるようになります。

```js
document.adoptedStyleSheets = [...adoptedStyleSheets, newSheet]; // これまで
document.adoptedStyleSheets.push(newSheet); // これから
```

### Handwriting Recognition API

OS などにある既存の手書きの文字認識機能を web 上で扱えるようにするための API が追加されました。

※現状この API が利用できるのは ChromeOS のみで対応言語も英語に限られています。

参考:

[Feature: Handwriting Recognition API](https://chromestatus.com/feature/5263213807534080)

### Unprefixed text-emphasis properties

CSS の text-emphasis プロパティが`-webkit`なしで使えるようになります。

参考:

https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis

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

v8 でサポートされている識別子の配列を返す`Intl.supportedValuesOf(code)`という新しい関数が追加されました。
サポートされるコード値は以下の 6 つです。

calendar

```js
Intl.supportedValuesOf("calendar");
// ['buddhist', 'chinese', 'coptic', 'dangi', ...]
```

collation

```js
Intl.supportedValuesOf("collation");
// ['big5han', 'compat', 'dict', 'emoji', ...]
```

currency

```js
Intl.supportedValuesOf("currency");
// ['ADP', 'AED', 'AFA', 'AFN', 'ALK', 'ALL', 'AMD', ...]
```

numberingSystem

```js
Intl.supportedValuesOf("numberingSystem");
// ['adlm', 'ahom', 'arab', 'arabext', 'bali', ...]
```

timeZone

```js
Intl.supportedValuesOf("timeZone");
// ['Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', 'Africa/Algiers', ...]
```

unit

```js
Intl.supportedValuesOf("unit");
// ['acre', 'bit', 'byte', 'celsius', 'centimeter', ...]
```

この新しいメソッドによって、Web 開発者はどの値が実装でサポートされているかを簡単に発見できるようになります。
