---
title: "Chrome95で追加された画面上の色を取得するEyeDropper APIについて"
author: "nakajmg"
createdAt: "2021-11-01"
summary: "EyeDropper APIについて紹介します"
tags:
  - "Web API"
---

[Chrome 95 がリリース](https://developer.chrome.com/blog/new-in-chrome-95/)され、新機能として EyeDropper API という API が追加されました。

## EyeDropper API とは

EyeDropper API は画面上から色情報を取得するカラーピッカーをブラウザ上で実現する API です。デザインツールなどに搭載されていることが多いかと思います。

Chrome の DevTools で色選択をするときにスポイトマークをクリックすると使える機能が単体の Web API として実装された形になります。

![](/frontend-expert/image/eyedropper-api/devtools_color-picker.png)
