# frontend-expert

## 記事書く人向け

手動で `./data/posts/` に新しい Markdown ファイルを作ってもいいですが、以下のコマンドを実行すると作ってくれます。
`title` とか `summary` はファイルに直接書いてください。 

```
$ npm run gen:new-post
```

## デプロイ

`main` ブランチに push すると、ビルド結果が `gh-pages` ブランチに push され、GitHub Pages にデプロイされます。
