---
title: "Firefox 95.0 リリースノートまとめ"
author: "BaHo"
createdAt: "2021-12-16"
summary: "Firefox 95.0 のリリースノートの日本語まとめです"
tags:
  - Releasenote
  - Browser
---

Firefox 95 がリリースされました。
本アップデートでは RLBox という新しいコードアイソレーション機能が導入されて信頼できないコードに対する安全性が向上しました。
また、Firefox App から Slack.com の Huddle や Call 機能が利用できるようになったのは嬉しいですね。

## New

- [RLBox](https://hacks.mozilla.org/2021/12/webassembly-and-back-again-fine-grained-sandboxing-in-firefox-95/)が全てのプラットフォームで有効になりました
  - 信頼できないコードを WebAssembly を用いてネイティブコードへコンパイルすることで意図しない領域外へのメモリアクセスを防止する機能のようです
  - [mozilla hacks](https://hacks.mozilla.org/2021/12/webassembly-and-back-again-fine-grained-sandboxing-in-firefox-95/)によれば、従来のプロセスを分割する手法における非同期化のオーバーヘッドやメモリフットプリントの増加を懸念した手法だと記載されていました。
- Windows 10 及び Windows 11 において Firefox App を Microsoft Store からダウンロードできるようになりました
- ブラウザクロームとツールバースクリーンショットがシンプルになりました
- macOS において WindowsServer イベントの処理時の CPU 使用量が削減されました
- macOS において主にフルスクリーン時のソフトウェアでコードされたビデオコンテンツの使用電力が削減されました
- PiP のトグルボタンをビデオウィンドウの反対側にへ移動できるようになりました
- Site Isolation が有効化されました。

## Fixed

- Firefox を起動した際、JAWS や ZoomText が Firefox をフォーカスするようになりました
- VoiceOver が ARIA の switch ロールの状態を正しく報告するようになりました
- macOS でコンテンツプロセスの起動速度が速くなりました
- メモリアロケータが改善されました
- JavaScript を先行してコンパイルするようになり、ページロード時のパフォーマンスが改善されました

## Changed

- Slack.com で Call や Huddles へアクセスできるように User Agent オーバーライドが追加されました

## Developer

### For web developers

#### HTML

- グローバル属性 `inputmode` が全てのプラットフォームでサポートされるようになりました

#### CSS

- Android 版 Firefox で cursor プロパティがサポートされました

#### APIs

- `Crypt.randomUUID()` 関数がサポートされました

#### Media, WebRTC, and Web Audio

- `SpeechSynthesisEvent.elapseTime` がミリ秒ではなく秒単位の経過時間を返すようになりました

#### WebDriver Conformance (Marionette)

- Marionette が使用しているポートがプロファイルディレクトリにある `MarionetteActivePort` ファイルに書き込まれるようになりました
- `WebDriver:NewSession` が最初のタブのロードが完了するまで待機するようになりました

### For add-on developers

- browserSettings に `overrideContentColorScheme` が追加され、`.css.prefers-color-scheme.content.override` という環境設定を制御することでブラウザのテーマとは独立したページ単位の優先的な配色を設定する機能が追加されました

## unresolved

- Gmail のリンクをコマンドクリックしても新しいタブが開かない問題がありました
  - 回避策: Gmail のリンクをコマンドキーを利用せずにクリックすると新しいタブが開きます
