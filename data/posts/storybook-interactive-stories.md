---
title: "Interactive storiesを使ってStorybook上でユーザー操作の状態を確認する"
author: "nus3"
editor:
  - "nakajmg"
  - "sakito"
createdAt: "2021-11-29"
summary: "Storybookに新しく追加されたInteractive storiesについて紹介します"
tags:
  - Storybook
---

[Storybook の 6.4.0 がリリース](https://github.com/storybookjs/storybook/releases/tag/v6.4.0)され、`Interactive stories`が新機能として追加されました。詳細は[Storybook のブログ](https://storybook.js.org/blog/interactive-stories-beta/)でも記載されています。

## 概要

Interactive stories の Addon を追加すると、testing-library で定義した操作を Storybook 上で確認することができるようになります。

次の gif のようにユーザー操作に対するコンポーネントの状態を UI(Addon)からステップごとに確認できます。

![Interactive addonを使った例](/frontend-expert/image/storybook-interactive-stories/capture.gif)

## 導入手順

1. パッケージを追加する
2. Storybook の`main.js`に設定を追加する
3. Interactive stories 用の story を`stories.tsx`に追加する

### 1. パッケージを追加する

Interactive addon を利用するには次のパッケージが必要です。  
(今回は React のコンポーネントを対象としています)

- @storybook/addon-interactions
- @storybook/react
- @storybook/testing-library

次のコマンドを実行してインストールします。

`npm i -D @storybook/addon-interactions @storybook/react @storybook/testing-library`

今回試したバージョンは次になります。

```json
{
  "devDependencies": {
    "@storybook/addon-interactions": "6.4.0",
    "@storybook/react": "6.4.0",
    "@storybook/testing-library": "0.0.7"
  }
}
```

### 2. Storybook の`main.js`に設定を追加する

```js
module.exports = {
  stories: ["../src/components/**/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-interactions"], // addonの追加
  features: {
    interactionsDebugger: true, // Interactive storiesをaddonで1ステップずつ確認できるようにするのに必要
  },
};
```

### 3. Interactive stories 用の story を`stories.tsx`に追加する

例えば、次のサンプルコードでは Storybook 上にマウントされたコンポーネントに対して、`Add`のラベルがついたボタンを 4 回クリックした後に`Reset`のボタンをクリックする story を`@storybook/testing-library`を使って追加しています。

```tsx
// Interactive storiesに関係ある部分しか記載してません
import { within, userEvent } from "@storybook/testing-library";

const Template: Story<ExampleComponentProps> = (args) => (
  <ExampleComponent {...args} />
);

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: "Add" }));
  await userEvent.click(canvas.getByRole("button", { name: "Add" }));
  await userEvent.click(canvas.getByRole("button", { name: "Add" }));
  await userEvent.click(canvas.getByRole("button", { name: "Add" }));
  await userEvent.click(canvas.getByRole("button", { name: "Reset" }));
};
```

`Default.play = async ({ canvasElement }) => {`は Storybook6.4 でサポートされる[CSF3](https://storybook.js.org/blog/component-story-format-3-0/)の構文です。  
また、まだ v0.5 ですが Storybook から[eslint-plugin](https://github.com/storybookjs/eslint-plugin-storybook)も提供されているので、併せて試してみても良さそうです。

Interactive stories の addon を追加した Storybook を GitHub Pages でホスティングしたので、実際に触ってみたい方は次のリンクへ。  
https://nus3.github.io/p-storybook/?path=/story/components-examplecomponent--default

Storybook 上で複雑な操作があるコンポーネントのデバッグや共有がしやすくなりそうですね。

## 参考リンク

- https://storybook.js.org/blog/interactive-stories-beta/
- https://storybook.js.org/blog/component-story-format-3-0/
- [実際に実装したリポジトリ](https://github.com/nus3/p-storybook)
