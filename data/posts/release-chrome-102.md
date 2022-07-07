---
title: "Chrome 102 リリースノートまとめ"
author: "Saji"
editor: "nus3"
createdAt: "2022-07-05"
summary: "Chrome 102 のリリースノートの要約です"
tags:
  - Releasenote
  - Browser
---

# Chrome 102

Chrome 102 のリリースノート関連の情報をまとめました。

https://developer.chrome.com/blog/new-in-chrome-102/
https://developer.chrome.com/blog/new-in-devtools-102/
https://developer.chrome.com/blog/deps-rems-102/
https://www.chromestatus.com/features#milestone%3D102
https://v8.dev/blog/v8-release-102

## New In Chrome (Chrome102)

Chrome102 で新しく追加された機能です。

### File Handling API

PWA に MIME タイプや拡張子を紐づけることができる File Handling API がサポートされました。

PWA のマニフェストに関連づけたい MIME タイプや拡張子を設定することで、Mac だと「このアプリケーションで開く」の候補に PWA のアプリケーションが選択できるようになります。

参考: Let installed web applications be file handlers

https://web.dev/file-handling/

### The inert property

`inert`プロパティは、グローバルな HTML 属性です。`inert`属性のついた要素は、フォーカスイベントや支援技術からのイベントなど、ユーザー入力イベントを無視します。

`inert`属性はモーダルダイアログやドロワーなどの UI パーツを作成するのに便利です。モーダルダイアログでは、モーダルが表示されている間、フォーカスをモーダル内に限定したくなりますが、これはモーダル外の要素に`inert`属性をつけることで実現できます。また、ユーザーから常に見えるわけではないドロワーでは、開閉時に`inert`属性を切り替えることで、「画面外にあるドロワーを誤ってキーボードで操作してしまう」ような誤作動を防止できます。

`inert`属性の利用例です。

```html=
<div>
  <label for="button1">Button 1</label>
  <button id="button1">inertではない</button>
</div>
<div inert>
  <label for="button2">Button 2</label>
  <button id="button2">inertである</button>
</div>
```

この例では二つ目の`div`に`inert`属性を付与しています。そのため内包された`<label>`要素や`<button>`要素はフォーカスやクリックできない要素になります。

`inert`属性は Chrome では 102 からサポートされますが、FireFox や Safari でも同様にサポートされる予定です。(執筆現在、Safari は 15.5 から、FireFox は Nightly で利用可能です。)

### Navigation API

#### 概要

近年の多く見られる SPA で作られたアプリでは、ページ移動なしで URL を更新します。この挙動を実現するため、一般的に`History API`が利用されますが、`History API`ではうまく用件を満たせないことや、動作がわかりにくくなることがあります。

このような History API の問題点をカバーするべく作られた API 仕様が Navigation API です。

#### 利用方法

Navigation API を使用するには、グローバルに生えた`navigation`オブジェクトに navigate リスナーを追加します。

```javascript=
navigation.addEventListener('navigate', (navigateEvent) => {
  switch (navigateEvent.destination.url) {
    case 'https://example.com/':
      navigateEvent.transitionWhile(loadIndexPage());
      break;
    case 'https://example.com/cats':
      navigateEvent.transitionWhile(loadCatsPage());
      break;
  }
});
```

ナビゲーションイベントは、`navigate`リスナーによって一元化されており、以下のような条件の有無に関わらずあらゆるタイプのナビゲーションイベントで発火します。

- フォームを送信したかどうか
- 戻る・進むアクションによる遷移か
- プログラムによって引き起こされたものかどうか

その上で、ほとんどの遷移に関するアクションに対して、デフォルトの動作を上書きすることができます。

詳細に関しては[Modern client-side routing: the Navigation API](https://developer.chrome.com/docs/web-platform/navigation-api/)をご覧ください。

### And more!

- ページ内検索等でヒットするまで表示されない`hidden=unfil-found`の指定ができるようになります

## What's New In DevTools (Chrome 102)

DevTools についてはこちらの日本語訳を参照ください。

https://developer.chrome.com/ja/blog/new-in-devtools-102/

## Deprecations and removals in Chrome 102

### Deprecate PaymentRequest.show() without User Activation

ユーザーのアクティベーションなしに`PaymentRequest.show()`を実行できなくなりました。

`PaymentRequest.show()`はクリックなどのユーザーイベント内で行う必要があります。

### Remove SDP Plan B

WebRTC でセッションを確立するために使用される `Session Description Protocol` (SDP) は、Chromium 上で`Unified Plan`と`Plan B`という 2 種類の異なる実装が存在しています。
`Plan B`はクロスブラウザでの互換性がないなどの問題を抱えていたため、102 から削除されます。

このバージョンから Chrome では`Plan B`を利用すると例外が投げられるようになります。これを回避したい場合は 2022 年 5 月 25 日までに[非推奨のトライアル](https://developer.chrome.com/origintrials/#/view_trial/3892235977954951169)に参加してください。また 12 月に終了した前回の非推奨トライアルに参加していて、今回のトライアルにも参加したい場合は、新しくトークンをリクエストする必要があることに注意してください。

## その他 Chrome Platform Status に記載されていたもの

### Add Save Data Client Hint

Permissions-Policy に`CH-Save-Data`を追加することで Client Hint として`Save-Data`が扱えるようになります。

`Sec-CH-Save-Data`が適切な Client Hint になり、Permissions-Policy を介してサードパーティへ送信されることを防ぐことができます。

参考: Save-Data
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data

### AudioContext.outputLatency

`AudioContext.outputLatency`プロパティが追加されました。

このプロパティは音声出力レイテンシーの推定値(秒数)を返します。技術的には、UserAgent がホストシステムにバッファの再生を要求してから、バッファ内の最初のサンプルが実際に音声出力デバイスによって処理されるまで(スピーカーなどであれば音が出るまで)の間隔を指します。

このプロパティは入力から出力までのレイテンシーを調整するために必要で、ビデオとオーディオストリームの同期などに非常に有効です。

### Capture Handle

ビデオキャプチャを行う他のアプリケーションに対して、特定の情報やコントロールを opt-in で公開できる仕組みを導入します。

たとえば、プレゼンテーション・アプリを開いたタブをビデオキャプチャしているアプリケーションがあったとします。この機能でプレゼンテーションアプリがキャプチャをしているアプリに対して、プレゼンテーションを操作を公開するとキャプチャをしているアプリからプレゼンテーションアプリを操作できるようになります。

ディスプレイキャプチャを行うアプリケーションは、キャプチャされるアプリケーションが Capture Handle 機能を提供していることを前提に、ユーザーに優れた機能性を提供できます。今までに似たような技術はありましたが、Capture Handle では、何を公開するか(オリジン・ハンドル・ID...etc)を選択可能にすることで、よりシンプルで信頼性が高く、安全な仕組みを提供します。

また私たちが提案するメカニズムでは、キャプチャされたアプリケーション側で、キャプチャする側のアプリケーションを制限できます。具体的には全ての web か特定の origin かを選択できます。

### HTTP->HTTPS redirect for HTTPS DNS records

DNS に問い合わせをする際に、従来の`A`および`AAAA`クエリと並行して、`HTTPS`レコードを問い合わせるようになります。ウェブサイトが`HTTPS`DNS レコードを設定していて、Chrome がそれを受信すると、Chrome は常に HTTPS で接続します。

### WebHID exclusionFilters option in requestDevice()

navigator.hid.requestDevice()に`exclusionFilters`が追加されました。

`exclusionFilters`を指定することでブラウザから扱いたくない HID デバイスを除外することができるようになります。

参考:

https://developer.mozilla.org/en-US/docs/Web/API/HID/requestDevice
