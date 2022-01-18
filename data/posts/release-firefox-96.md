---
title: "CSS color-scheme サポート追加等 Firefox 96.0 リリースノートまとめ"
author: "BaHo"
editor: "shisama"
createdAt: "2022-01-18"
summary: "Firefox 96.0 のリリースノートの日本語まとめです"
tags:
  - Releasenote
  - Browser
---

- https://www.mozilla.org/en-US/firefox/96.0/releasenotes/
- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/96

Firefox 96 がリリースされました！
全体的に性能面での改善が多くを占めるアップデートでした。
本リリースでは Cookie Policy がデフォルトで `Same-Site=lax`を指定するようになりました。
また、`color-scheme`プロパティが追加されて便利になりましたね。

## New

- ノイズ抑制やオートゲインコントロールの大きな改善とエコーキャンセレーションの若干の改善がされました
- メインスレッドの負荷が大きく軽減されました
- Cookie Policy をデフォルトで `Same-Site=lax` に強制するようになりました

## Fixed

- macOS で Gmail のリンクをコマンドクリックした際、正常に新しいタブが開くようになりました
  - Firefox95 で unresolved になっていた問題の解決
- ビデオの SSRC(RTP セッションでの参加者の識別子) が断続的にドロップする問題が修正されました
- 特定のサイトでビデオの画質が劣化する問題が修正されました
- macOS でいくつかの問題を回避するためにフルスクリーンでのビデオが無効化されています

## Developer

- Linux にて `Select All` のショートカットキーが `Alt-A` から `Ctrl-A` に変更されました
  - web-compatibility の確保やアクセスキーとの衝突回避のため

### For web developers

#### CSS

- CSS で色の値として利用される `hwb()` 関数が実装されました
- `color-scheme` プロパティがサポートされました
- `counter-reset` プロパティにて逆順の CSS カウンターを生成する `reversed()` 関数がサポートされました

#### HTTP

- 同じドメインから送信された Cookie でも異なるスキームを使用されているものは Cookie SameSite ディレクティブについて別サイトから送信されたものと見なすようになりました
- SameSite 属性が指定されていない Cookie は暗黙的に `SameSite=lax` が指定されるようになりました
- `SameSite=none` を指定した Cookie はセキュアなコンテキストが必要になりました

#### APIs

- Android において `navigator.canShare()` がサポートされました
- デフォルトで Web Locks API が有効になりました

#### Canvas

- WebP の画像エンコーダーをサポートしました

#### DOM

- `IntersectionObserver()` のコンストラクターが関連付けられたパラメータオプションにから文字が渡された場合に例外発生ではなく `rootMargin` を設定するようになりました

#### Media, WebRTC, and Web Audio

- いくつかの非標準な静的フィールドが WebRTC Statistics API から削除されました

#### WebDriver conformance (Marionette)

- `WebDriver:GetElementShadowRoot` コマンドが追加されました
  - 指定された要素が持っている shadow root を取り出す
- `WebDriver:ExecuteScript` 及び `WebDriver:ExecuteAsyncScript`にて要素の `ShadowRoot` を返す際に `cyclic object error` が発生する問題が解決されました
- `WebDriver:Print` が PDF にプリントする際のページ範囲をサポートするように拡張されました

## Web Platform

- Web Lock API が実装されました。
  - 異なる ServiceWorker やタブで実行されているスクリプトを相互連携させることが可能になります
- WebRTC ライブラリが更新されたことで Web 会議アプリでの音声やビデオ機能が改善されました
- CSS にて `color-scheme` がサポートされ、Web ページがどのカラースキームでレンダリング可能かを指定できるようになりました
