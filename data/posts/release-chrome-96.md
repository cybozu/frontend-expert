---
title: "Chrome 96 リリースノートまとめ"
author: "Saji"
editor: "nus3"
createdAt: "2021-12-02"
summary: "Chrome 96 のリリースノートの要約です"
tags:
  - Releasenote
  - Browser
---

Chrome 96 のリリースノート関連の情報をまとめました。

- https://developer.chrome.com/blog/new-in-chrome-96/
- https://developer.chrome.com/blog/new-in-devtools-96/
- https://developer.chrome.com/blog/deps-rems-96/
- https://www.chromestatus.com/features#milestone%3D96
- https://v8.dev/blog/v8-release-96

## New In Chrome (Chrome 96)
Chrome 96で新しく追加された機能です。

### Manifest id for PWAs

今まではPWAをインストールする際、ブラウザ側でPWAを一意に識別するための明確な方法が存在しておらず、ブラウザの判断に委ねられていました。(実際ブラウザによってPWAマニフェストファイルの`start_url`が利用されていたり、マニフェストファイル自体のパスなどが利用されたりしています)

今回のアップデートにより、マニフェストファイル内でPWAの識別子を`id`プロパティとして明示的に定義できるようになりました。

マニフェストに`id`プロパティを追加すると、マニフェストファイルの`start_url`プロパティやマニフェストファイル場所へ依存がなくなり、これらのフィールドを更新することが容易になります。

#### サポート状況と予定

デスクトップのChromium搭載ブラウザ

- Chrome 96からidプロパティがサポートされます。

モバイルブラウザ(マニフェストファイルのURLをユニークIDとして使用しているもの)

- 2022年前半にサポートが開始される予定です。

#### idプロパティの追加について

すでに運用しているPWAのマニフェストファイルにidを追加する場合

- ブラウザから割り当てられたIDを使用する必要があります。
- 割り当てられているID は、Dev Tools の `Application` パネルの `Manifest` ペインで確認できます。

新しくPWAを作成する場合

- idプロパティに好きな文字列を設定することができますが、将来的に変更することはできないので慎重に選んでください。

### URL protocol handlers for PWAs

今までwebページで利用可能だった`URL protocol handler`の登録がChrome 96からはPWAでもインストール時に行えるようになりました。

PWAの場合は以下のように`protocol_handlers`プロパティをマニフェストファイルに記載することで登録できます。
```json
{
  ...
  "protocol_handlers": [
    {
      "protocol": "web+tea",
      "url": "/tea?type=%s"
    },
    {
      "protocol": "web+coffee",
      "url": "/coffee?type=%s"
    }
  ]
}
```

それぞれ、`protocol`には登録したいプロトコル名を、`url`にはそのプロトコルのURLをクリックしたときに開いてほしいURLを指定します。ただし、これらのプロトコル登録にはいくつかの制限があります。詳細や登録方法などは[こちら](https://web.dev/url-protocol-handler/)を参照してください。

### Priority hints (origin trial)

ブラウザがページ内リソース(`image`,`script`,`CSS`)を読み込む際の優先度ヒントを追加できる機能がOrigin Trialsとして実験的に利用できるようになりました。

具体的には以下のような形で対象となるリソースに`importance`属性で優先度(`high`,`low`,`auto`から選択)を指定します。
```html
<!-- We don't want a high priority for this above-the-fold image -->
<img src="/not-important.svg" importance="low">

<!-- Initiate an early fetch for a resource, but de-prioritize it -->
<link rel="preload" href="/script.js" as="script" importance="low">

<script>
  fetch('https://example.com/', {importance: 'high'})
      .then(data => {
        // Trigger a high priority fetch
      });
</script>
```

今回のリリースノートでは Google Flights ページで、`Priority hitns` の有無におけるLCP(最大視覚コンテンツの表示時間)の比較を行った結果を紹介しています。この比較では背景画像の`img`タグに対して`importance="high"`を指定することでLCPが 2.6s から 1.9s に向上したとしています。

機能詳細やOrigin Trialとして登録する方法、サンプルなどについては[Optimizing resource loading with Priority Hints](https://web.dev/priority-hints/)を参考にしてください。

### Emulate Chrome 100 in the UA string

来年の早い段階でChromeはバージョン100がリリースされる予定であり、これ以降３桁のバージョン番号に突入します。そのため、バージョン番号を利用しているコードや`UserAgent`をパースしているコードが３桁のバージョン番号でも正しく動作することを保証する必要があります。

これらを検証するためChrome 96では`#force-major-version-to-100`というフラグが追加されました。このフラグを有効にするとChromeのバージョンだけが100になった状態をシミュレートすることができ、バージョン番号を扱う動作に問題がないかの検証を行うことができます。

詳しくは [Force Chrome major version to 100 in the User-Agent string.](https://developer.chrome.com/blog/force-major-version-to-100/) を参照してください。

### Chrome Dev Summit

Chrome Dev Summitにおけるすべての動画やコンテンツはオンラインで視聴可能です。詳しくは [Chrome Dev Summit site](https://developer.chrome.com/devsummit/) をご覧ください。またkeynoteや配信を見逃した方はChrome Developers YouTube Channelの [CDS Playlist](https://www.youtube.com/playlist?list=PLNYkxOF6rcIBju4hD9ed1pt6YO20LgLWg) を合わせて参照してください。

### その他

`Back/forward cache`の機能が`stable`になりました。
- これによりFireFoxやSafariと挙動を揃えることができるようになりました。

## What's New In DevTools (Chrome 96)

DevTools についてはこちらの日本語訳を参照ください。

https://developer.chrome.com/ja/blog/new-in-devtools-96/

## Deprecations and removals in Chrome 96

Chrome96で非推奨になったもの、もしくは削除されたものです  
https://developer.chrome.com/blog/deps-rems-96/

### The "basic-card" method of PaymentRequest API

PaymentRequestを呼び出すときに指定できる`basic card`method(ブラウザで保存されているカード情報を使う方法)が非推奨になります。

Chrome 96では`basic card`を使っているとDevToolsのConsoleにwarningメッセージが表示されます。また、Chrome 100では利用できなくなります。`basic card`を使っている場合は別のmethodに変更するように早めに対応したほうが良さそうです。

https://blog.chromium.org/2021/10/sunsetting-basic-card-payment-method-in.html

## その他Chrome Platform Statusに記載されていたもの

https://www.chromestatus.com/features#milestone%3D96

### Adding captureTimestamp and senderCaptureTimeOffset to RTCRtpContributingSource.

WebRTC APIの一つである`RTCRtpContributingSource`にオーディオとビデオフレームの同期やend-to-endの遅延が測定できる`captureTimestamp`と`senderCaptureTimeOffset`プロパティが追加されます。

https://www.chromestatus.com/feature/5728533701722112

### CSS @counter-style descriptor 'speak-as'

`@counter-style`を使った際にカウンターが音声形式でどのように表されるかを指定できるプロパティ`speak-as`が追加予定で、現状は`In developer trial`で試験運用中です。

https://www.chromestatus.com/feature/5687059677184000
https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/speak-as

### Clipboard: Preserve PNG metadata

クリップボードからPNGを読み込む際にサニタイズされなくなります。
(前まではメタデータを削除していました)

https://www.chromestatus.com/feature/5629962485760000

### Cross-Origin-Embedder-Policy: credentialless

COEPに`credentialless`が追加できるようになりました。
`credentialless`を指定するとサーバーへのリクエスト時に認証方法(CookieやAuthorizationヘッダなど)が省かれるようになります。

https://www.chromestatus.com/feature/4918234241302528

参考: SharedArrayBuffer と過渡期な cross-origin isolation の話
https://blog.agektmr.com/2021/11/cross-origin-isolation.html

### Disable propagation of body style to viewport when contained

ルートやbody要素に`contain: none`以外の値を使用するとbodyからのCSSプロパティの伝搬が無効になります。
https://www.chromestatus.com/feature/5663240823504896

### EME MediaKeySession Closed Reason

MediaKeySessionのcloseメソッドが`MediaKeySessionClosedReason`を返すようになります。
sessionが閉じられた理由(`internal-error`, `closed-by-application`など)を取得してハンドリングできるようになります。

```js
const keySystemAccess = await navigator.requestMediaKeySystemAccess(
//   ...
);
// Create media keys.
const mediaKeys = await keySystemAccess.createMediaKeys();
// Create a key session.
keySession = mediaKeys.createSession();
// Generate a fake license request.
await keySession.generateRequest("webm", new Uint8Array([1, 2, 3]));

keySession.closed.then((reason) => {
// Reason is either undefined if not supported, "internal-error",
// "closed-by-application", "release-acknowledged",
// "hardware-context-reset", or "resource-evicted".
log(`Media key session was closed. Reason: "${reason}".`);
});
```

https://www.chromestatus.com/feature/5632124143009792

参考: EME MediaKeySession Closed Reason Sample
https://googlechrome.github.io/samples/media/key-session-closed-reason.html

### HTTP->HTTPS redirect for HTTPS DNS records

DNSのHTTPSレコードを従来のAレコードやAAAAレコードと一緒に照会し、解析するようになります。
HTTPSレコードを追加し、Chromeがそれを受信するとChromeは常にそのウェブサイトにHTTPSで接続します。

https://www.chromestatus.com/feature/5485544526053376

### InteractionID in EventTiming

Event Timing APIのPerformanceEventTimingに`interactionId`が追加されました。
ユーザーの操作に対して関連するイベント(たとえばユーザーがタップした時にはpointerdown→mousedown→pointerup→mouseup→clickのイベントが発生する)は`interactionId`が同じになります。

https://www.chromestatus.com/feature/5674224959094784

### Media Queries: prefers-contrast feature

OSが設定している色のコントラスト設定に対応するメディアクエリ`prefers-contrast`が追加されました。

```css
.contrast {
    /* ... */
}

@media (prefers-contrast: more) {
  .contrast {
    /* OSでコントラストの設定が高い場合に適応される */
  }
}

@media (prefers-contrast: less) {
  .contrast {
    /* OSでコントラストの設定が低い場合に適応される */
  }
}
```

https://www.chromestatus.com/feature/5646323212615680

参考: prefers-contrast(MDN)  
https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-contrast

### Support calc(`<number>`) where only accepts `<integer>`

cssの`calc()`関数でintegerしか受け取らないような場所でもnumberを指定できるようになりました。
もっとも近い整数に丸められます。

例えば、下記はいずれも`column-count: 1`と同義です。

```css
.example {
  column-count: calc(1.2);
  column-count: calc(0.6);
}
```

https://www.chromestatus.com/feature/5656451751084032

参考: 
https://drafts.csswg.org/css-values-4/#calc-range

## V8 release v9.6
V8のアップデート情報です。
### WebAssembly : Reference Types
WebWebAssemblyでプロポーザルとして提案されている[Reference Type](https://github.com/WebAssembly/reference-types/blob/master/proposals/reference-types/Overview.md)がV8 v9.6からサポートされます。
現状、WASMの関数は引数や戻り値に、整数や浮動小数点数といったプリミティブな型しか扱えませんが、`Reference Types`機能はこれに加えて、JavaScriptオブジェクトへの参照を渡せるようにしたものです。
