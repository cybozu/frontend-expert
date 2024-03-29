import { dirname } from "dirname-filename-esm";
import fs from "node:fs/promises";
import path from "node:path";
import { Articles, ZennArticles } from "../src/utils/zenn/schema";
import { members } from "../src/utils/members";

const __dirname = dirname(import.meta);
const ZENN_DIR_PATH = path.join(__dirname, "..", "data", "zenn");
const ZENN_ARTICLES_PATH = path.join(ZENN_DIR_PATH, "articles.json");

async function createZennData() {
  const zennData: ZennArticles = await fetchPublicationPosts();

  const filtered: ZennArticles = {
    ...zennData,
    articles: zennData.articles.filter(({ user: { username } }) =>
      members.some(
        ({ zennUsername }) => !!zennUsername && zennUsername === username
      )
    ),
  };

  await fs.writeFile(ZENN_ARTICLES_PATH, JSON.stringify(filtered));
}

async function fetchPublicationPosts() {
  const res = await fetch(
    "https://zenn.dev/api/articles?publication_name=cybozu_frontend&count=96&order=latest"
  );
  const json = await res.json();

  return Articles.parse(json);
}

createZennData();
