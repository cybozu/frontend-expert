---
title: "Chrome 101 リリースノートまとめ"
author: "sajikix"
editor: "nus3"
createdAt: "2022-5-16"
summary: "Chrome 101 のリリースノートの要約です"
tags:
  - Releasenote
  - Browser
---

# Chrome101

Chrome 101 のリリースノート関連の情報をまとめました。

https://developer.chrome.com/blog/new-in-chrome-101/
https://developer.chrome.com/blog/new-in-devtools-101/
https://developer.chrome.com/blog/deps-rems-101/
https://www.chromestatus.com/features#milestone%3D101


## New In Chrome (Chrome 101)

Chrome101 で新しく追加された機能です。

### `hwb()` color notation
CSSの色指定方法として`hwb()`値がサポートされました。

hwb() は、色相、白色度、黒色度にしたがって色を指定します。他の色表記と同様に、オプションのアルファ成分で不透明度を指定することもできます。以下の例では`#00c3ff`の色を50%透過度で指定しています。

```css
h1 {
  color: hwb(194 0% 0% / .5) /* #00c3ff with 50% opacity */
}
```
FireFoxではv96から、Safariではv15からこの`hwb()`値をサポートしているため、今回のChromeのサポートにより、多くのブラウザでこの記法が使えることになります。


### Priority Hints
ブラウザがページ内リソース(`image`,`script`,`CSS`)を読み込む際の優先度ヒントを明示的に宣言できる`Priority Hints`機能がリリースされました。

htmlで読み込みの優先度ヒントを書く場合は、`fetchpriority`属性に`high`,`low`,`auto`のいずれかを指定します。

```html
<!-- 優先度 low で画像を読み込む場合 -->
<img src="/images/in_viewport_but_not_important.svg" fetchpriority="low" alt="I'm an unimportant image!">
```

この機能はChrome96からOriginTrialとして試験的に実装されており、当時は`importance`属性を用いる方法をとっていましたが、Web標準化プロセスの中で、HTMLでは`fetchpriority`、JavaScriptのFetch APIでは`priority`というプロパティを利用するよう仕様が変更されました。

優先度指定における細かい挙動やユースケースについては[Optimize resource loading with Priority Hints](https://web.dev/priority-hints/)を参照してください。


### Also in this release

#### USBDevice forget()
`USBDevice`オブジェクトで`forgot()`メソッドがサポートされました。このメソッドでは以前許可されていたデバイスの登録を削除することができます。例えば多くのデバイスで共有されているコンピューターで使用されているアプリケーションなどでは有用です。

#### Web USB sameObject behavior
`USBConfiguration`、`USBInterface`、`USBAlternateInterface`、`USBEndpoint` の4つのインスタンスが厳密な同値（`===`）なるのは、同じ`USBDevice`のアクセッサから取得した場合のみに変更されます。

#### Secure context fix for dedicated workers
安全な(HTTPSの)Originからロードされているが、安全でない(HTTPSでない)コンテキストでインスタンス化された専用ワーカーは安全だとはみなされなくなりました。

具体的に上記のような状況において、以下のような変更が入ります
- `self.isSecureContext`が`false`を返すようになる
- `self.caches` と `self.storageFoundation` が使用できなくなる

この修正により、上記のようなワーカーの挙動においてHTML標準やGeckoと互換性を持つようになりました。

#### Make 'true' a truthy value for window.open boolean features
chrome98から、`window.open()`に対し`popup=yes`または`popup=1`のように指定することで、ポップアップウィンドウで開くことをブラウザに要求することが出来るようになりました。

このpopup値として`yes`,`1`などがサポートされていたものの、`true/false`がサポートされていなかったため、`popup=true`はpopupを開かないことを意味していました。

このように`popup=true`がfalseとして評価されるのは直感に反しているため、Chrome101からは`popup=true`がtrueとして評価されるようになります。

## What's New In DevTools (Chrome 101)

DevTools についてはこちらの日本語訳を参照ください。

https://developer.chrome.com/ja/blog/new-in-devtools-101/

## Deprecations and removals in Chrome 101

### Reduce user agent string information
ChromeではHTTPリクエストやnavigatorで利用されるUser-Agent文字列の削減に取り組んでいます。この取り組みはUser-Agent文字列がユーザーフィンガープリンティング(webブラウザからの情報だけで個人の情報を特定する技術)に利用されるのを防ぐために行われています。現在はOriginTrialとしてこれらの取り組みを進めています。

### Remove WebSQL in third-party contexts
サードパーティーのコンテキストにおけるWebSQL機能を削除しました。Web SQL Database標準は2009年4月に提案され、2010年11月に放棄された標準で、FireFoxはこの機能を搭載せず、Safariも2019年から非推奨としています。またW3Cは代替手段として、Web StorageとIndexed Databaseを推奨しています。Chromeとしても使用率が十分に低くなった時点で完全に非推奨とし、削除する予定です。

## その他 Chrome Platform Status に記載されていたもの

### MediaCapabilities API for WebRTC
`MediaCapabilities API`でWebRTCストリームをサポートするようになりました。

`MediaCapabilities API`は、動画再生に使用できるコーデックや解像度などの情報を提供するAPIです。これらの情報によりwebアプリケーションは使用するコーデクなどがサポートされているかどうか、スムーズな再生が期待できるかどうかを判断できるようになります。

今回のリリースからWebRTCストリームについての情報もこの`MediaCapabilities API`から取得できるようになります。この機能がない場合、アプリケーションが不必要に低い解像度やフレームレートを使用して品質が低下したり、クライアントが希望するフレームレートでストリームを処理できずスタッタリングが発生したりする可能性があります。

### font-palette and custom @font-palette-values palettes
カラーフォントで利用するパレットを選択することができる、`font-palette` CSSプロパティがサポートされました。

また`@font-palette-values`ルールを利用することで、ベースとなるカラーパレットを選択したり、カラーパレットの上書きなどができるようになります。

ベースとなるカラーパレットを選択する例
```css
@font-palette-values --Pinks {
  font-family: MultiColorFont;
  base-palette: 1; /* パレットを番号で指定 */
}

.text-pink {
  font-palette: --Pinks; /* @font-palette-valuesで作成したパレットを指定 */
}
```

カラーパレットを上書きする例
```css
@font-palette-values --SkyAndYellow {
  font-family: MultiColorFont;
  override-colors:　
    0 #87dbe8, 
    1 #f7ca25;　/* 対応する番号のカラーを上書き */
}
```

このように`font-palette` CSSプロパティのサポートは、すでにサポートしているCOLR/CPALカラーフォントの有用性を向上するものです。ダークモード対応をはじめとして、アイコンフォントをコンテンツの配色に合わせたいユースケースでこの機能はとても有用です。
