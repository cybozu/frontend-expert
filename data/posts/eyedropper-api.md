---
title: "Chrome95で追加された画面上の色を取得するEyeDropper APIについて"
author: "nakajmg"
createdAt: "2021-11-02"
summary: "Chromiumベースのブラウザーに追加されたEyeDropper APIについて紹介します"
tags:
  - "Web API"
---

[Chrome 95 がリリース](https://developer.chrome.com/blog/new-in-chrome-95/)され、新機能として EyeDropper API が追加されました。(Edge 95 にも追加されました)

## EyeDropper API とは

EyeDropper API は画面上から色情報を取得するスポイトツールをブラウザ上で実現する API です。スポイトツールはデザインツールなどに搭載されていることが多いかと思います。
Chrome の DevTools にも色選択をするときにスポイトアイコンをクリックするとスポイトツールが使えますが、この機能が単体の Web API として実装された形になります。

![DevToolsのカラーピッカー](/frontend-expert/image/eyedropper-api/eyedropper.png)

## 使い方

EyeDropper API の使い方は次のようになります。

```js
const eyeDropper = new EyeDropper();
const result = await eyeDropper.open();
console.log(result); // {sRGBHex: '#92d0e1'}
```

`EyeDropper`のインスタンスで`open`を実行すると色選択の UI が表示されます。

### セキュリティ上の制約

EyeDropper API の `open` はユーザーの操作なしに実行するとエラーになります。

```
DOMException: Failed to execute 'open' on 'EyeDropper': EyeDropper::open() requires user gesture.
```

これはプライバシーやセキュリティを考慮しての制限になります。`open`はユーザーの操作によってのみスポイトモードに移行し、ユーザーがクリックしたときのみ色の値を返します。
これによって悪意のあるサイトがユーザーの画面のピクセル情報を勝手に取得できないようになっています。

### console からは起動できる

ユーザーの操作なしに起動できない API ですが、DevTools の console からはその限りではありません。次のワンライナーのコードを console で実行するとスポイトツールを起動できます。

```js
await new EyeDropper().open();
```

覚えておくと便利かもしれません。

ちなみにですが、Snippets からは起動できませんでした。

## EyeDropper API を使ったデモサイト

EyeDropper API のデモサイトの紹介です。こちらのデモでは EyeDropper API を使った色選択ゲームが遊べます。

[eyedropper-demos/color-game](https://captainbrosset.github.io/eyedropper-demos/color-game.html)

Play ボタンをクリックするとカウントダウンが開始されます。時間内に左のマスに表示された色と同じ色を選択すると勝ちです。

![EyeDropper APIのデモ](/frontend-expert/image/eyedropper-api/demo.png)

一部ブラウザでは `input`タグで`type="color"`とすることで似たようなピッカーを使用できましたが、UI なしに実行できるようになったことでいろいろな使い道が考えられそうですね。

## 参考リンク

- https://wicg.github.io/eyedropper-api/
- https://web.dev/eyedropper/
