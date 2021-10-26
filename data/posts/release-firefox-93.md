---
title: "Firefox 93.0 リリースノート要約"
author: "BaHo"
editor: "nakajmg"
createdAt: "2021-10-21"
summary: "Firefox 93.0 のリリースノートの要約です"
tags:
  - Releasenote
---

Firefox 93 がリリースされました！

- https://www.mozilla.org/en-US/firefox/93.0/releasenotes/
- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/93

今回のリリースから AVIF 画像フォーマットがデフォルトで有効化されます。

クライアント側の使用感が変わるわけではありませんが、今後こういった高圧縮可能な形式がスタンダードになることでよりリッチな Web コンテンツを多く提供できるようになるかもしれませんね。

また、クラスの `static` 初期化ブロックをはじめとして、多くのイベントハンドラやプロパティの追加が盛り込まれているため、開発者視点では重要なアップデートではないかと思われます。

## New

- AV1 形式の画像フォーマットに対応
- PDF ビューアーがより詳細なフォームに対応(複数の政府や銀行が使用している XFA ベースフォーム)
- Windows 版にて、利用可能メモリが極端に少ない場合に利用状況や属性に基づいてタブを自動的にアンロードするようになった
- macOS 版にて、.dmg ファイルからマウントされた Firefox を実行している時、セッションを失わないためにインストールを完了するかどうかプロンプトが表示されるようになった
- 安全でない接続に依存している、もしくは安全でない可能性のあるダウンロードをブロックするようになった
- Smart Block 3.0 (プライバシー保護機能)の互換性向上
- 新しい referrer tracking protection を Strick Tracking Protection と Private Browsing に導入
- Firefox Suggest(Web ナビゲーター) の導入

## Fixed

- VoiceOver がアクセス可能なツリーコントロール内にあるチェック可能アイテムのチェック状態を正しく判別するようになった
- Orca スクリーンリーダーが Firefox で正しく動作するようになった
- その他セキュリティ修正

## Changed

- 3DES を使用する TLS 暗号スイートが無効化
  - 非推奨バージョンの TLS を有効化する設定により利用は可能
- ダウンロードパネルが Firefox のビジュアルスタイルに沿うようになった

## for web developer

### HTML

- ARIA `meter` ロールを実装
- `<input type="datetime-local">` の UI を実装

### CSS

- `font-synthesis` に `small-caps` キーワードを追加

### JavaScript

- クラスの `static` 初期化ブロックをサポート
- `createImageBitmap()` にて option オブジェクトを用いて `imageOrientation` 及び `premultiplyAlpha` プロパティを渡せるようになった
- `Intl.supportedValueOf()` をサポート
  - 実装でサポートされている値をコードで列挙できるようになった

### HTTP

- ダイジェストを用いた HTTP 認証で SHA-256 アルゴリズムをサポート
- 画像のデフォルト HTTP ACCEPT ヘッダーが `image/avif,image/webp,*/*` に変更
  - AV1 フォーマット対応によるものだと思われます

### APIs

- `ElementInternals.shadowRoot` 及び `HTMLElement.attachInternals` をサポート
- `ResizeObserver.Observe()` にて `device-pixel-content-box` 値をサポート
- グローバル関数 `reportError()` をサポート
  - スクリプトがコンソールやグローバルイベントハンドラに対してエラーを報告できるようになった

### Events

- グローバルイベントハンドラプロパティ `onsecuritypolicyviolation` をサポート
  - コンテンツセキュリティポリシー違反時に発生する `securitypolicyviolation` イベントを処理するハンドラを割り当てることが可能になった
- `GlobalEventHandlers` 及び `ShadowRoot` にて `onslotchange` イベントハンドラプロパティをサポート
  - スロットに含まれるノードが変更された際に `<slot>` 要素で発生する `slotchange` イベントを処理するハンドラを割り当てることが可能になった

### Removals

- `KeyboardEvent.initKeyEvent()` が `dom.keyboardevent.init_key_event.enabled` によって実行可否が制御されるようになり、デフォルトで無効になった

### WebDerive conformance (Marionette)

- 大きなドキュメントに対して `WebDriver:Print` が失敗する原因になっているバグを修正

### for add-on developers

- `windowId` が指定されている場合、サイドバーが `extension.getViews` に包含されるようになった

### Other

- AVIF 画像のサポートがデフォルトで有効になった
  - `image.avif.compliance_strictness` を用いて仕様準拠の厳密生を調節できる
  - アニメーション画像には非対応

## Web Platform

- `<input type="datetime-local">` の UI を実装
