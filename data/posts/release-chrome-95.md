---
title: "Chrome 95 リリースノートまとめ"
author: "nus3"
editor: "nakajmg"
createdAt: "2021-11-15"
summary: "Chrome 95 のリリースノートの要約です"
tags:
  - Releasenote
  - Browser
---

Chrome 95 のリリースノート関連の情報をまとめました。

- https://developer.chrome.com/blog/new-in-chrome-95/
- https://developer.chrome.com/blog/new-in-devtools-95/
- https://developer.chrome.com/blog/deps-rems-95/
- https://www.chromestatus.com/features#milestone%3D95

## Routing with URLPattern

`URLPattern`という機能が追加されました。現在は Chrome、Edge の 95 以上に対応しています。

他のブラウザや Node.js ではまだサポートされていない機能ですが、[urlpattern-polyfill](https://github.com/kenchris/urlpattern-polyfill)で polyfill できます。

```javascript
const pattern = new URLPattern({ pathname: "/books/:id" });
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.exec("https://example.com/books/123").pathname.groups); // { id: '123' }

// 引数で渡せる全てのプロパティ
const p = new URLPattern({
  protocol: "http{s}?",
  username: ":username",
  password: ":password",
  hostname: ":subdomain.example.com",
  port: ":port(80|443)",
  pathname: "/:path",
  search: "*",
  hash: "*",
});
```

詳細はこちら
https://web.dev/urlpattern/

## Picking colors with the Eye Dropper API

カラーを取得する Eye Dropper API が追加されました

詳細はこちらの記事で解説しています。

[Chrome 95 で追加された画面上の色を取得する EyeDropper API について](https://cybozu.github.io/frontend-expert/posts/eyedropper-api)

## PWA Summit

10 月 6~7 日に PWA Summit が開催されてました  
見逃した方はアーカイブが下記のリンクに残ってるので、そこから確認できます

https://pwasummit.org/  
https://www.youtube.com/channel/UC1j3gvdVISAEO1_2MwA5oQw/videos

## User-agent reduction origin trial

Origin Trial で実際に User-Agent の文字列が削減された後の挙動が試せます

参考:

- [User-Agent Client Hints によるユーザーのプライバシーと開発者体験の改善](https://web.dev/user-agent-client-hints/)
- [User-Agent Reduction origin trial(日本語訳)](https://developers-jp.googleblog.com/2021/09/chrome-user-agent.html)

## And more!

- Storage Foundation API を origin trial で試せます
- WebAssembly で例外処理のサポートが提供され、例外がスローされたときにコードが中断できるようになります
- Chrome 100 が来年きます。バージョンが 2 桁から 3 桁になるので、自分のコードに何らかの影響があるかどうかを確認するといいかもしれません

## DevTools

DevTools についてはこちらの日本語訳を参照ください。

https://developer.chrome.com/ja/blog/new-in-devtools-95/

## Deprecations and removals in Chrome 95

Chrome 95 で非推奨になったもの、もしくは削除されたものです。

### Support for URLs with non-IPv4 hostnames ending in numbers

有効な IPv4 アドレスではない、 `http://foo.127.1/` のような数字で終わる host name を持つ URL が拒否されるようになります。

社内のプレビュー環境などで IP アドレスをポストフィックスとして利用してたりする場合は影響がでているかもしれません。

### WebAssembly cross-origin module sharing

same-site間でのWebAssemblyモジュールの共有が非推奨になりました
https://www.chromestatus.com/feature/5650158039597056

参考:

https://developer.chrome.com/blog/wasm-module-sharing-restricted-to-same-origin/


### Deprecate U2F API (Cryptotoken)

U2F API が非推奨になり、Chrome 98 からはデフォルトで無効になります。

U2F とはなんぞやという人はこちらの記事が参考になります。

[Web Authentication API で FIDO U2F(YubiKey) 認証 | blog.jxck.io](https://blog.jxck.io/entries/2018-05-15/webauthentication-api.html)

## その他 Chrome Platform Status に記載されていたもの

> https://www.chromestatus.com/features#milestone=95

### Back-forward cache for same-site navigations on Android

Chrome 86 から origin trial で試せていた Android での戻る/進むのキャッシュが same-site で効くようになりました。  
https://www.chromestatus.com/feature/5694778600587264

bfcache(Back/forward cache)については下記に詳細の説明が載っています。  
https://web.dev/bfcache/

### CSS @counter-style rules in shadow trees

Shadow tree に対してカスタムの counter-style を定義することができるようになりました。  
https://www.chromestatus.com/feature/5716198446596096

`@counter-style`については下記を参考ください
```css
@counter-style circled-alpha {
  system: fixed;
  symbols: Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ;
  suffix: " ";
}

.items {
  list-style: circled-alpha;
}
```

このスタイルを当てた list を作ると次のようなリストができます。

```
Ⓐ One
Ⓑ Two
Ⓒ Three
Ⓓ Four
Ⓔ FIve
```

https://developer.mozilla.org/ja/docs/Web/CSS/@counter-style#specifying_symbols_with_counter-style

### Cookie size limits

Set-Cookie header、及び、document.cookie、CookieStore で設定される Cookie のサイズが制限されます。
具体的には Cookie の名前と値の合計が 4096 バイトまでになり、Cookie の各属性値は 1024 バイトに制限する必要があります。

https://www.chromestatus.com/feature/4946713618939904

### Logical properties for contain-intrinsic-size

contain-intrinsic-size を省略した次の表記が追加されます。

- contain-intrinsic-{width,height}
- contain-intrinsic-{inline,block}-size

https://www.chromestatus.com/feature/5709654999957504

参考:

https://drafts.csswg.org/css-sizing-4/#intrinsic-size-override

### contain-intrinsic-size

content-visibility で指定された要素の自然なサイズを制御するプロパティです。

次の実装は画面外の section のレンダリングをスキップする例です。

```html
<style>
section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
</style>
```

ビューポート外のコンテンツはレンダリングされなくなります。

https://developer.mozilla.org/ja/docs/Web/CSS/content-visibility

### New UA platform version source on Windows for User-Agent Client Hints

Windows の Sec-CH-UA-Platform-Version(User-Agent Client Hints)で返されるバージョンが Windows プラットフォームの違いを識別できるように更新されました。

https://www.chromestatus.com/feature/5080939765956608  
https://github.com/WICG/ua-client-hints/issues/220#issuecomment-870858413

### Note taking new note URL

Web Application Manifest が `note_taking` と `new_note_url` に対応しました。
Web Application 側から新しいメモを書きたい時にユーザーエージェントに読み込ませたい URL を指定できるようになります。

https://www.chromestatus.com/feature/5205972320518144  
https://wicg.github.io/manifest-incubations/index.html#note_taking-member

### Secure payment confirmation

WebAuthn を利用して、Web 上での支払い時の認証を強化することができるようになります。

https://www.chromestatus.com/feature/5702310124584960

※ Payment Request API で簡単・高速な決済を実現する
https://developers.google.com/web/updates/2016/07/payment-request?hl=ja

※ PaymentRequestAPI で secure-payment-confirmation を使った実装例
https://www.w3.org/TR/2021/WD-secure-payment-confirmation-20210831/#sctn-sample-authentication

### droppedEntriesCount in PerformanceObserver callback

PerformanceObserver のコールバックに droppedEntriesCount が追加されます。

https://www.chromestatus.com/feature/5320666234486784

PerformanceObserver  
https://developer.mozilla.org/ja/docs/Web/API/PerformanceObserver

### self.reportError()

https://www.chromestatus.com/feature/5634523220934656

参考:

- https://esdiscuss.org/topic/a-way-of-explicitly-reporting-exceptions
- https://github.com/whatwg/html/pull/1196#issuecomment-854177687
