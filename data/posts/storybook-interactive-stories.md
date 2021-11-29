---
title: "Storybook 6.4 で追加されたInteractive storiesについて"
author: "nus3"
editor: "nakajmg"
createdAt: "2021-11-29"
summary: "Storybookに新しく追加されたInteractive storiesについて紹介します"
tags:
 - Storybook
---

[Storybookの6.4.0がリリース](https://github.com/storybookjs/storybook/releases/tag/v6.4.0)され、`Interactive stories`が新機能として追加されました。詳細は[Storybookのブログ](https://storybook.js.org/blog/interactive-stories-beta/)でも記載されています。

## 概要

Interactive storiesのAddonを追加すると、testing-libraryで定義した操作をStorybook上で確認することができるようになります。

次のgifのようにユーザー操作に対するコンポーネントの状態をUI(Addon)からステップごとに確認できます。

![Interactive addonを使った例](/frontend-expert/image/storybook-interactive-stories/capture.gif)


## 導入手順

1. パッケージを追加する
2. Storybookの`main.js`に設定を追加する
3. Interactive stories用のstoryを`stories.tsx`に追加する


### 1. パッケージを追加する

Interactive addonを利用するには次のパッケージが必要です。  
(今回はReactのコンポーネントを対象としています)

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
    "@storybook/testing-library": "0.0.7",
  }
}
```

### 2. Storybookの`main.js`に設定を追加する

```js
module.exports = {
  stories: ['../src/components/**/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-interactions'], // addonの追加
  features: {
    interactionsDebugger: true, // Interactive storiesをaddonで1ステップずつ確認できるようにするのに必要
  }
}
```

### 3. Interactive stories用のstoryを`stories.tsx`に追加する

例えば、次のサンプルコードではStorybook上にマウントされたコンポーネントに対して、`Add`のラベルがついたボタンを4回クリックした後に`Reset`のボタンをクリックするstoryを`@storybook/testing-library`を使って追加しています。

```tsx
// Interactive storiesに関係ある部分しか記載してません
import { within, userEvent } from '@storybook/testing-library'

const Template: Story<ExampleComponentProps> = (args) => (
  <ExampleComponent {...args} />
)

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole('button', { name: 'Add' }))
  await userEvent.click(canvas.getByRole('button', { name: 'Add' }))
  await userEvent.click(canvas.getByRole('button', { name: 'Add' }))
  await userEvent.click(canvas.getByRole('button', { name: 'Add' }))
  await userEvent.click(canvas.getByRole('button', { name: 'Reset' }))
}
```

Interactive storiesのaddonを追加したStorybookをGitHub Pagesでホスティングしたので、実際に触ってみたい方は次のリンクへ。  
https://nus3.github.io/p-storybook/?path=/story/components-examplecomponent--default

Interactive storiesが追加されたことでStorybook上で複雑な操作があるコンポーネントのデバッグや共有がしやすくなりそうですね。

## 参考リンク

- https://storybook.js.org/blog/interactive-stories-beta/
- [実際に実装したリポジトリ](https://github.com/nus3/p-storybook)
