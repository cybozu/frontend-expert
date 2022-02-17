---
title: "COLRv1 fontのサポートなど、Chrome 98 リリースノートまとめ"
author: "nus3"
editor: "Saji"
createdAt: "2022-02-18"
summary: "Chrome 98 のリリースノートの要約です"
tags:
  - Releasenote
  - Browser
---

Chrome 98 のリリースノート関連の情報をまとめました。

- https://developer.chrome.com/blog/new-in-chrome-98/
- https://developer.chrome.com/blog/new-in-devtools-98/
- https://developer.chrome.com/blog/deps-rems-98/
- https://www.chromestatus.com/features#milestone%3D98

## New In Chrome (Chrome 98)

Chrome98 で新しく追加された機能です。

### Opting out of auto-dark themes on Android

Chrome96 から、Android では OriginTrial として「[Auto Dark Themes](https://developer.chrome.com/blog/auto-dark-theme/)」という機能を追加しています。

この機能はユーザーの OS がダークモードである場合、明るいテーマのサイトに対しブラウザが自動的に生成したダークテーマを適用するものです。

今回のアップデートでは OriginTrial に登録したサイトのうち、特定のページで自動生成されるダークテーマを無効にする方法が追加されました。

具体的には以下のように`meta`タグを利用して無効化することが出来ます。

```html
<meta name="color-scheme" content="only light" />
```

また以下のように`color-scheme: only light`というスタイルを`:root`要素にあてることでも無効化できます。

```css
:root {
  color-scheme: only light;
}
```

CSS スタイルを利用する方法の優れた点として、以下のように要素ごとに自動生成されるダークテーマを無効にできる点が挙げられます。

```css=
.only-light,
#my-element {
  color-scheme: only light;
}
```

詳しくは[Auto Dark Themes on Android](https://developer.chrome.com/blog/auto-dark-theme/)における[How to opt-out of Auto Dark Theme](https://developer.chrome.com/blog/auto-dark-theme/#per-element-opt-out)の章を参照してください。

### COLRv1 font support

COLRv1 フォントがサポートされました。

COLRv1 では COLRv0 と比べて、新たにフォントのグラデーションや合成などに対応しています。また、フォントが鮮明なまま圧縮率が高いのも特徴の一つです。

次の参考記事では実際にグラデーションを導入したカラーフォントや COLRv1 と Bitmap を比較してどれほど鮮明なのかを確認することができます。

お使いの Chrome のバージョンを 98 にアップデートした上で、ぜひ見てみてください！

参考:

https://developer.chrome.com/blog/colrv1-fonts/

### Emulate Chrome 100 in the UA string

ここ何回かのリリースには必ず含まれている内容ですね。

Chrome のバージョンがもうすぐ 100 になるので、Chrome のバージョンを使っているような実装がある場合はバージョン番号が 3 桁になっても正しく動くかどうか確認しましょう。現在のバージョンを 100 にする[#force-major-version-to-100](https://developer.chrome.com/blog/force-major-version-to-100/)フラグを使って、既存のコードが正しく動くか確認することができます。

### And more!

## What's New In DevTools (Chrome 98)

DevTools についてはこちらの日本語訳を参照ください。

https://developer.chrome.com/ja/blog/new-in-devtools-97/

## Deprecations and removals in Chrome 98

### Remove SDES key exchange for WebRTC

Chrome97 で記載があったものですが、98 で Shipping になりました。

詳細は[前回のリリースノートのまとめ](https://cybozu.github.io/frontend-expert/posts/release-chrome-97)でも記載したので、そちらをご覧ください。

## その他 Chrome Platform Status に記載されていたもの

### Add support for Promise to Blobs in clipboard item

`ClipboardItem`オブジェクトに対して Promise をサポートしました。

今まで、Chrome では`ClipboardItem`コンストラクターの引数として「文字列または blob に解決される Promise」を受け取ることが出来ませんでした。

今回のアップデートにより`clipboard.write`API が呼ばれた時に、一旦クリップボードに書き込む Blob データを同期的に取得する必要がなくなり、ブロックすることなく非同期的に write メソッドを呼び出すことができるようになります。

### CSS Color Adjust: 'only' keyword for color-scheme

`color-scheme`プロパティの`only`キーワードがサポートされました。only を指定することでユーザーエージェント(ブラウザ)が要素のカラースキーマを上書きすることを禁止します。

参考:

- https://developer.mozilla.org/ja/docs/Web/CSS/color-scheme
- https://drafts.csswg.org/css-color-adjust/#color-scheme-prop

### FileSystemHandle::Remove() method

FileSystemHandle に`Remove()`メソッドを追加しました。

今ままで`FileSystemHandle`から直接ファイルやディレクトリを削除することは不可能で、親ディレクトリの`FileSystemDirectoryHandle`から`RemoveEntry`を呼ぶ必要がありました。

今回のアップデートにより「`showSaveFilePicker`から`FileHandle`を取得したが、結局保存したくなくなったのでファイルを削除したい」というような、よくあるユースケースに対応できるようになりました。

### HDR CSS Media Queries: dynamic-range

CSS のメディアクエリーに`dynamic-range`が追加されました。

次のサンプルコードのように、ディスプレイが HDR をサポートしてるかしていないかを`dynamic-range`で判別できるようになります。

```css
/* HDRをサポートしていない */
@media (dynamic-range: standard) {
  .contrast {
    color: red;
  }
}

/* ディスプレイがHDRをサポートしている */
@media (dynamic-range: high) {
  .contrast {
    color: green;
  }
}
```

参考:

https://www.w3.org/TR/mediaqueries-5/#dynamic-range

### New window.open() popup vs. window behavior

`window.open()`では第 3 引数として`windowFeatures`という option を DOMString で指定できますが、今バージョンから`popup`という機能に対応するようになりました。` popup=yes`または`popup=1`のように指定することで、ポップアップウィンドウを利用して開くことをブラウザに要求することが出来ます。

この変更は window.open の新しくリリースされた仕様に合わせて、相互運用性のために行われた変更です。 広報互換性のため、ポップアップやタブ/ウィンドウを開く既存の動作に変更はありません。

### Private Network Access preflight requests for subresources

サブリソースに対するプライベートネットワークリクエストの前に CORS プリフライトリクエストを送信し、ターゲットサーバーからの明示的な許可を求めるようになります。

プライベートネットワークリクエストとは以下のようなリクエストとのことです。

- パブリック Web サイトからプライベート IP アドレスまたはローカルホストへのリクエスト
- プライベートな Web サイト（イントラネットなど）からローカルホストへのリクエスト

プライベートネットワーク上のサービスや機器(ネットワーク機器やプリンタなど)は CSRF 対策が不十分なものが多く、今回のアップデートはこれらの攻撃リスクを軽減させるための対策になります。

### WritableStream controller AbortSignal

[WritableStream.abort()](https://developer.mozilla.org/ja/docs/Web/API/WritableStream/abort)を実行した際に、ストリームへの進行中の書き込みの中止や終了がすぐに実行されるようになりました。

### self.structuredClone()

ディープコピーができる`structuredClone()`がついに 98 で実装されました。

お使いの Chrome を 98 にアップデートした上で、DevTools の Console で次のサンプルコードを試しに実行してみると`structuredClone()`で実際にディープコピーが実行されていることが確認できます。

```js
const myOriginal = {
  someProp: "with a string value",
  anotherProp: {
    withAnotherProp: 1,
  },
};

const myShallowCopy = { ...myOriginal };
myShallowCopy.anotherProp.withAnotherProp = "a new value";
console.log(
  myOriginal.anotherProp.withAnotherProp,
  myShallowCopy.anotherProp.withAnotherProp
);
```

```js
const myOriginal = {
  someProp: "with a string value",
  anotherProp: {
    withAnotherProp: 1,
  },
};

const myDeepCopy = structuredClone(myOriginal);
myDeepCopy.anotherProp.withAnotherProp = "a new value";
console.log(
  myOriginal.anotherProp.withAnotherProp,
  myDeepCopy.anotherProp.withAnotherProp
);
```

参考:

https://web.dev/structured-clone/
