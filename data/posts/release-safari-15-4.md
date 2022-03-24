---
title: "Safari 15.4 リリースノートまとめ | dialog Element や lazy-loading, CSS Cascade Layers サポートなど"
author: "mugi"
createdAt: "2022-03-25"
summary: "New WebKit Features in Safari 15.4 のリリースノートのまとめです"
tags:
  - Releasenote
  - Browser
---

🔗 https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/

Safari 15.4 がリリースされました 🎉  
ここまで Technology Preview として公開されていた様々な変更が含まれています。

## HTML

- 遅延読み込みのための `lazy-loading` のサポート
  - https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading
- `<dialog>` Element のサポート  
  - https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element
- `::backdrop` 疑似要素のサポート  
  - https://developer.mozilla.org/ja/docs/Web/CSS/::backdrop
- `autofocus` 属性のサポート  
  - dialog 表示時にどの要素にフォーカスをセットするかを指定できる

## CSS

### Features for CSS Architecture

- `:has()` のサポート (現状 Safari のみサポート)
  - https://developer.mozilla.org/ja/docs/Web/CSS/:has
- CSS Cascade Layers のサポート
  - FEE チームの @nus3 が書いた CSS Cascade Layers の紹介エントリ: https://cybozu.github.io/frontend-expert/posts/css-cascade-layers)

### Solving Pain Points

- 主にモバイル向けに、viewport 指定に応じた新しい CSS 値指定が可能に
  - `svh`, `svw` → メニューバーなどを除いた最小の viewport
  - `dvh`, `dvw` → スクロールによるメニューバーなどの表示切り替えに応じて変化する viewport
  - `lvh`, `lvw` → メニューバーなどが存在しない状態を想定した最大の viewport
  - `svmin`, `svmax`, `lvmin`, `lvmax`, `dvmin`, `dvmax` → `vw`, `vh`, `vmin`, `vmax` の上記 CSS 値版 (幅, 高さに対する割合指定)
- `:focus-visible` 疑似要素のサポート
- `accent-color` プロパティのサポート
  - checkbox, radio, progress, select, datalist (iPad OS と iOS のみ range, button) にアクセントカラー指定が可能になる
- `calc()` 数学関数のサポート

### Typography

- `font-palette` と `@font-palette-values` CSS プロパティのサポート
  - カラーフォントに含まれるパレットの指定と、カラーパレットの独自定義
- `text-decoration-skip-ink` CSS プロパティのサポート
  - text-decoration (underline とか)を文字に被らず表示できる
- `ic` 単位のサポート
  - `1ic` が `水` の文字の幅と同等になる

### Retiring WebKit prefixes

- `-webkit` vendor prefix の付与が必要だった様々なプロパティが廃止。また、廃止に伴い prefix 不要で利用可能なプロパティのサポート追加
  - `appearance`
  - `mask`
  - `backface-visibility`
  - `text-combine-upright`
  - `print-color-adjust`
  - `match-parent` (`text-align` プロパティに指定可能な値)
  - 削除: `-webkit-border-fit`, `-webkit-margin-collapse`, `-webkit-margin-top-collapse`, `-webkit-margin-bottom-collapse`, `-webkit-margin-before-collapse`, `-webkit-margin-after-collapse`, `-webkit-background-composite`

## Web APIs

- BroadcastCannel のサポート
  - https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts
  - タブ、ウィンドウ、iframe, worker の相互通信が可能になる
- Web Locks API のサポート
  - https://w3c.github.io/web-locks/
  - タブ、ウィンドウ、iframe, worker 間でリソースのロックコントロールを行う
- `scroll-behavior` または `window.scroll()`, `window.scrollTo()`, `window.scrollBy()` の `behivior` オプションでスクロール制御を可能に
- `ResizeObserver API` で `ResizeObserverSize` インタフェースのサポート
  - 対象要素の `box-sizing` プロパティの変更を監視可能に
- `structuredClone` のサポート
  - DeepClone
  - Chrome/Edge/Firefox/Safari のすべてがサポートされました 🎉
- `Origin Private File System` のサポート
  - 詳細はこちら: https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/

## JavaScript

- `findLast()`, `findLastIndex()` メソッドのサポート
- `at()` のサポート
- `Object.hasOwn()` のサポート

### Internationalization

- `Intl Enumeration API` (https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl) の強化
  - `Intl.Locale` で、暦週・書く方向・12h/24h のサイクル・番号システムといった情報を取得可能になった
  - `Intl.DisplayNames` で calendar・dateTimeField のサポート追加および languageDisplay オプションのサポート
  - `Intl.PluralRules` に `selectRange()` メソッドの追加
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/selectRange
    - https://unicode-org.github.io/cldr-staging/charts/37/supplemental/language_plural_rules.html#rules に従い、数値の複数形のルールを示す文字列を得る
  - `Intl.NumberFormat` に `formatRange()` と `formatRangeToParts()` メソッドの追加
    - 数値範囲を示す文字列にフォーマットする
  - `Intl.DateTimeFormat` に 複数の `timeZoneName` オプションの追加

## Web Apps

- Web App Manifest 周りのアップデート (≒ PWA 絡みでのアップデート)
  - Manifest ファイルをページロード時に常にフェッチするようになる
  - Manifest ファイルでのアイコン宣言のサポート
    - `purpose` 指定に応じて `apple-touch-icon` 以外のアイコンを利用する
  - ServiceWorker で Navigation Preload が使えるように
    - ServiceWorker の起動時のブロッキングを回避できるように

## Media

- WebRTC negotiation API が WebRTC 1.0 仕様に準拠
- in-band chapter tracks のサポート
  - https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/kind
- `<video>` で `requestVideoFrameCallback()` のサポート追加
  - ビデオフレームの表示可能タイミングでのコールバックとメタデータ受け取りが可能になる

## Privacy

- Private Click Measurement (https://webkit.org/blog/11940/pcm-click-fraud-prevention-and-attribution-sent-to-advertiser/) 周りで幾つかのアップデート

## Security

- Inline Script / Style / eval などでリソースがブロックされた場合のレポートが Web 標準にあわせて更新
- XSS 対策機能の XSS Auditor サポート削除 (CSP や COEP で代替)

## WKWebView

- iOS, iPadOS, macOS 上のアプリケーションの場合、FullScreen API 利用の制御が可能になった
- iPadOS で Media Source Extensions を利用するコンテンツが動作するようになった
  - https://developer.mozilla.org/ja/docs/Web/API/Media_Source_Extensions_API

## Safari Web Extensions

- クロスブラウザでの拡張機能サポートに伴う `manifest_version 3` のサポートなど
  - バックグラウンドスクリプトで `service_worker` のサポート
  - `browser.scripting` によるスクリプトとスタイルのインジェクション
  - `browser.declarativeNetRequest` を介したネットワークリクエストの動的ルールやセッションルール
  - `externally_connectable:matches` による、Web ページから拡張機能へのメッセージング

## Web Inspector

- CSS Cascade Layer サポート追加に伴い、Web Inspector 上で `@layer` ルールセットが確認可能になった
- Flexbox および Grid で、視覚的なコントロールの追加
- Style パネルでのプロパティや値の変更時の自動補完の強化
- CSS 表示の改善。未使用の継承値の非表示や、フィルタによる検索、種類でのグループ化など

---

`<dialog>` のサポートや `:focus-visible` などは身近な感じがありますね。

また、Web Extensions で manifest_version 3 のサポートが強化されたことで、クロスブラウザ向けのブラウザ拡張で Safari も含めやすくなるかもしれません。
