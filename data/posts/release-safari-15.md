---
title: "Safari 15 の新機能とかまとめ"
author: "mugi"
editor: "nakajmg"
createdAt: "2021-11-16"
summary: "先日 Safari 15 がリリースされました。影響の大きそうな箇所や、知っておいたほうが良さそうな箇所を中心に紹介します。"
tags:
  - Releasenote
  - Browser
---

先日 Safari 15 がリリースされました。
https://webkit.org/blog/11989/new-webkit-features-in-safari-15/

影響の大きそうな箇所や、知っておいたほうが良さそうな箇所を中心に紹介します。

## HTML

### theme-color

meta タグ上での `theme-color` のサポートが追加されました。
指定することで、ブラウザのメニューバーやタブバーといった領域のカラーを変更することができます。 `prefers-color-scheme` と併用することで、ダークモード/ライトモードに応じた色の指定もできます。

[Design for Safari 15](https://developer.apple.com/videos/play/wwdc2021/10029/)

## CSS

### `aspect-ratio` プロパティのサポート

[aspect-ratio - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)

### `lab()` `lch()` `hwb()` シンタックスのサポート

[W3C Color Module Level 4](https://www.w3.org/TR/css-color-4/)に沿った新しいカラーシンタックス `lab()` `lch()` `hwb()` が利用可能になりました。

### list-style-type に設定可能な値が追加

li 要素など、リストアイテム要素のマーカーを指定するための `list-style-type` 新たに 12 個の値が設定可能になりました。

MDN のデモで値に応じた表示を確認することができます。

https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type#result_2

## Web Inspector

CSS Grid に対応したオーバレイ表示が可能になりました。

https://webkit.org/blog/11588/introducing-css-grid-inspector/

デバッグ用のブレークポイント周りなどにも改善が施されています。その他の変更点は WWDC2021 の発表動画に含まれます。

[Discover Web Inspector improvements - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10031/)

## JavaScript and WebAssembly

Worker や ServiceWorker で ES6 Modules のサポートが追加されました。

また、JavaScript エンジンで次の機能がサポートされました。

- top-level `await`
- `Error.cause`
- プライベートクラスメソッド とアクセサ
- `BigInt64Array` および `BigUint64Array`

WebAssembly では次のサポートが追加されました。

- streaming compilation
- bulk memory operations
- reference types
- non-trapping conversions from `float` to `int`

[WebAssembly/spec - proposals](https://github.com/WebAssembly/spec/tree/main/proposals)
[Develop advanced web content - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10030)

## Web APIs

### WebGL2 に対応

WebGL2 に対応し、かつ Apple の グラフィック API の Metal 上で動作するようになり、パフォーマンスが向上しました。

### Web Share API Level 2 の実装

Web Share API Level 2 の実装により、Web ページからアプリへのファイル共有が可能になりました。

[Develop advanced web content - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10030)

## Media

- MediaSession API のサポートの追加

[Coordinate media playback in Safari with Group Activities - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10189/)

## Security and Privacy

### 自動 HTTPS アップグレードのサポート

http と https の双方が利用可能なページの場合、自動で https を利用するようになります。

## 所感

`aspect-ratio` が 主要 4 ブラウザ(Chrome/Safari/Firefox/Edge)すべてで利用可能になりましたね。今後利用するケースが徐々に増えていきそうです。

余談ですが、`list-style-type` に `japanese-formal` を指定すると `壱・弐・参・四・伍…` になるのですね。カッコいいです。
