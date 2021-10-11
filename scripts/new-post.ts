import fs from "fs/promises";
import path from "path";
import { prompt } from "enquirer";
import { POSTS_DIR_PATH } from "./utils";

main();

function getFormattedData() {
  const date = new Date();
  const dateStr =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  return dateStr;
}

function getContent() {
  const createdAt = getFormattedData();
  return `---
title: ""
author: ""
createdAt: "${createdAt}"
summary: ""
tags: []
---
`;
}

async function main() {
  const { slug } = await prompt<{ slug: string }>({
    type: "input",
    name: "slug",
    message: "新しい記事のファイル名を、拡張子を含めずに入力してください",
  });
  const newPostPath = path.join(POSTS_DIR_PATH, `${slug}.md`);
  await fs.writeFile(newPostPath, getContent());
  const relativePath = path.relative(process.cwd(), newPostPath);
  console.log(`${relativePath} にファイルを作成しました`);
}
