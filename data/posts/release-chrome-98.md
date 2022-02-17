---
title: "COLRv1 fontのサポートなど、Chrome 98 リリースノートまとめ"
author: "nus3"
editor: "Saji"
createdAt: "2022-01-15"
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
Chrome96から、AndroidではOriginTrialとして「[Auto Dark Themes](https://developer.chrome.com/blog/auto-dark-theme/)」という機能を追加しています。

この機能はユーザーのOSがダークモードである場合、明るいテーマのサイトに対しブラウザが自動的に生成したダークテーマを適用するものです。

今回のアップデートではOriginTrialに登録したサイトのうち、特定のページで自動生成されるダークテーマを無効にする方法が追加されました。

具体的には以下のように`meta`タグを利用して無効化することが出来ます。
```htmlmixed=
<meta name="color-scheme" content="only light">
```

また以下のように`color-scheme: only light`というスタイルを`:root`要素にあてることでも無効化できます。
```css
:root {
  color-scheme: only light;
}
```

CSSスタイルを利用する方法の優れた点として、以下のように要素ごとに自動生成されるダークテーマを無効にできる点が挙げられます。
```css=
.only-light,
#my-element {
  color-scheme: only light;
}
```
詳しくは[Auto Dark Themes on Android](https://developer.chrome.com/blog/auto-dark-theme/)における[How to opt-out of Auto Dark Theme](https://developer.chrome.com/blog/auto-dark-theme/#per-element-opt-out)の章を参照してください。
<!-- saji -->

### COLRv1 font support

<!-- nus3 -->

内容

### Emulate Chrome 100 in the UA string

<!-- nus3 -->

内容

### And more!


## What's New In DevTools (Chrome 98)

DevTools についてはこちらの日本語訳を参照ください。

https://developer.chrome.com/ja/blog/new-in-devtools-97/

## Deprecations and removals in Chrome 98

### Remove SDES key exchange for WebRTC

<!-- nus3 -->

内容

## その他 Chrome Platform Status に記載されていたもの

### Add support for Promise to Blobs in clipboard item
`ClipboardItem`オブジェクトに対してPromiseをサポートしました。

今まで、Chromeでは`ClipboardItem`コンストラクターの引数として「文字列またはblobに解決されるPromise」を受け取ることが出来ませんでした。

今回のアップデートにより`clipboard.write`APIが呼ばれた時に、一旦クリップボードに書き込むBlobデータを同期的に取得する必要がなくなり、ブロックすることなく非同期的にwriteメソッドを呼び出すことができるようになります。
<!-- saji -->

### CSS Color Adjust: 'only' keyword for color-scheme

<!-- nus3 -->

内容

### FileSystemHandle::Remove() method
FileSystemHandleに`Remove()`メソッドを追加しました。

今ままで`FileSystemHandle`から直接ファイルやディレクトリを削除することは不可能で、親ディレクトリの`FileSystemDirectoryHandle`から`RemoveEntry`を呼ぶ必要がありました。

今回のアップデートにより「`showSaveFilePicker`から`FileHandle`を取得したが、結局保存したくなくなったのでファイルを削除したい」というような、よくあるユースケースに対応できるようになりました。

<!-- saji -->

### HDR CSS Media Queries: dynamic-range

<!-- nus3 -->

内容

### New window.open() popup vs. window behavior
`window.open()`では第3引数として`windowFeatures`というoptionをDOMStringで指定できますが、今バージョンから`popup`という機能に対応するようになりました。` popup=yes`または`popup=1`のように指定することで、ポップアップウィンドウを利用して開くことをブラウザに要求することが出来ます。

この変更はwindow.openの新しくリリースされた仕様に合わせて、相互運用性のために行われた変更です。 広報互換性のため、ポップアップやタブ/ウィンドウを開く既存の動作に変更はありません。
<!-- saji -->


### Private Network Access preflight requests for subresources
<!-- saji -->
内容

### WritableStream controller AbortSignal

<!-- nus3 -->

内容

### self.structuredClone()

<!-- nus3 -->

内容

## V8 release v9.8
(ありませんでした的な文章)

