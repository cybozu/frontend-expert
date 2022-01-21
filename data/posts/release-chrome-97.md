---
title: "Web Transportのサポートなど、Chrome 97 リリースノートまとめ"
author: "Saji"
editor: "nus3"
createdAt: "2022-01-21"
summary: "Chrome 97 のリリースノートの要約です"
tags:
  - Releasenote
  - Browser
---

Chrome 97 のリリースノート関連の情報をまとめました。

- https://developer.chrome.com/blog/new-in-chrome-97/
- https://developer.chrome.com/blog/new-in-devtools-97/
- https://developer.chrome.com/blog/deps-rems-97/
- https://www.chromestatus.com/features#milestone%3D97
- https://v8.dev/blog/v8-release-97

## New In Chrome (Chrome 97)

Chrome97 で新しく追加された機能です。

### Web Transport

サーバーとクライアントの双方向リアルタイム通信を実現する新しいフレームワーク<!--(APIという方が適切？)-->として提案されている`Web Transport`が正式にサポートされました。

Web Transport は既存の代表的手法である`Web Sockets`や`WebRTC`と比べ以下のような利点を持っています。

- `WebSockets`よりも低遅延な通信を実現する。
- P2P メッセージング用に設計された`WebRTC`と違い、クライアントサーバーメッセージングを前提として設計されているため扱いやすい。

Web Transport では`streams API`と`datagram API`という２種類の通信 API がサポートされており、それぞれ以下のような特徴から使い分けることができます。

- streams API : 信頼性の高い順序付けられたデータ送信に最適
- datagram API : 信頼性や順序がそこまで求められず、より低遅延でベストエフォートなデータ送信に最適

注意点として、Web Transport を試すためには`HTTP/3`をサポートしたサーバーが必要となります。<!--(QUICの話入れる？)-->

Web Transport は以下のような形で簡単に使うことができます。

```javascript=
const url = 'https://example.com:4999/foo/bar';
const transport = new WebTransport(url); // WebTransportインスタンス生成
await transport.ready; // 接続を待つ

const writer = transport.datagrams.writable.getWriter();
const data1 = new Uint8Array([65, 66, 67]);
writer.write(data1);
```

詳しくは[Experimenting with WebTransport](https://web.dev/webtransport/)を参照しててください。

### Script type feature detection

ブラウザ側で`ES Modules`の対応を判別する方法として今まで`nomodule`属性がありましたが、`import maps`, `speculation rules`,`bundle preloading`などの新しく提案されている仕様には対応しきれていませんでした。

今回サポートされた`HTMLScriptElement.supports()`を利用することで以下のように script の type 属性の仕様に対応しているかのチェックをすることができるようになります。

```javascript=
if (HTMLScriptElement.supports('importmap')) {
  // Use <script type="importmap" ...>
} else if (HTMLScriptElement.supports('module')) {
  // Use <script type="module" ...>
} else {
  // Use classic method...
}
```

### New array prototypes

Array と TypedArray で`findLast()`と`findLastIndex()`が使えるようになりました。
この二つの関数は引数で渡された条件に合致する配列内の**最後の要素**の値、位置をそれぞれ返します。

```javascript=
const array = [5, 12, 8, 130, 44, 3, 6];

const last = array.findLast((value) => value > 10);
console.log(last); // 44
const lastIndex = array.findLastIndex((value) => value > 10);
console.log(lastIndex); // 4
```

### Emulate Chrome 100 in the UA string

あと数ヶ月で Chrome のバージョンは 3 桁となる 100 に到達します。
バージョンや UA 文字列をパースするコードがある場合は 3 桁でも動くかどうか確認しましょう。

現在のバージョンを 100 にする[#force-major-version-to-100](https://developer.chrome.com/blog/force-major-version-to-100/)フラグを使って、既存のコードが正しく動くか確認することができます。

### And more!

上記以外のようなアップデートがあります。

- フォーム入力の改行が Gecko や WebKit と同じ方法で正規化されるようになりました。
  - これによりブラウザ間の相互運用性が向上しました。
- `client hint`のプレフィクスを`sec-ch`にするように標準化を進めています。
  - 例えば`dpr`は`sec-ch-dpr`のようになります。
  - 以前の仕様のヒントも当分の間サポートを続けますが、いずれは非推奨となり削除されることを想定しましょう。
- 閉じている`<detail>`要素が検索可能になり、閉じている`<detail>`要素内の element にスクロールしようとした際は閉じられている`<detail>`要素を自動的に開くようになりました。

### What's New In DevTools (Chrome 97)

DevTools についてはこちらの日本語訳を参照ください。

https://developer.chrome.com/ja/blog/new-in-devtools-97/

### Deprecations and removals in Chrome 97

Chrome97 で非推奨になったもの、もしくは削除されたものです

https://developer.chrome.com/blog/deps-rems-97/

### Remove SDES key exchange for WebRTC

WebRTC の SDES 鍵交換の仕様は 2013 年以降、関連する IETF の標準仕様では MUST NOT となっており、近年では Chrome での使用率も大幅に低下しているので Chrome97 で廃止されました。

参考:

https://webrtc-security.github.io/report_ja/

### Remove WebSQL in third-party contexts

サードパーティ製の WebSQL が廃止されました。W3C では代わりに Web Storage と Indexed Database を推奨しています。

### Remove SDP Plan B

WebRTC でセッションを確立するために使用される SDP に非標準の実装であった`Plan B`が削除されました。

参考: SDP の Unified Plan と Plan B

https://blog.jxck.io/entries/2018-01-05/sdp-unified-plan.html

## その他 Chrome Platform Status に記載されていたもの

<!-- saji -->

https://www.chromestatus.com/features#milestone%3D97

### Feature policy for Keyboard API

各言語に対応した keybord レイアウト情報を返す`getLayoutMap()`メソッドは全てのコンテキスト(iframe 内など)では利用できないという問題点がありました。今回のアップデートで iframe の allow 属性に`keyboard-map`を追加することでこの問題を解決することができるようになりました。

https://chromestatus.com/features/5657965899022336

### `PermissionStatus.prototype.name`

`PermissionStatus` インターフェースに読み取り専用の属性 `"name"` を追加し、`PermissionStatus` が作成された後、パーミッションの名前が取得できるようになりました。

今までは`Permissions API` を使って複数のパーミッションを同時に問い合わせた際、どの PermissionStatus がどのパーミッションに対応しているのかを識別する方法がありませんでした。

https://chromestatus.com/features/5651653697994752

### Propagate request origin and redirect chain in passthrough service workers.

`fetch(evt.request)`メソッドで navigation requests を発行する ServiceWorker が`FetchEvent.request` からのオリジンとリダイレクトチェーンを使用するようになります。

今までは常に ServiceWorker のオリジンが設定され、リダイレクトチェーンを使用することはありませんでした。

https://chromestatus.com/features/5752539724120064

### Support calc(`<number>`) where only accepts `<integer>`

[Chrome 96 リリースノートまとめ](https://cybozu.github.io/frontend-expert/posts/release-chrome-96)にも記載したものが、Chrome97 で追加されました。

> css の calc()関数で integer しか受け取らないような場所でも number を指定できるようになりました。 もっとも近い整数に丸められます。

https://chromestatus.com/features/5656451751084032

### transform: perspective(none)

CSS transform プロパティ内で利用できる、`perspective()`関数への引数として'none'を実装としてサポートしました。`perspective(0)`と`perspective(none)`では挙動が変わるため、変形をしないことを意図する場合(単位行列として扱いたい場合)は`perspective(none)`を利用するようにしましょう。

https://chromestatus.com/features/5687325523705856
