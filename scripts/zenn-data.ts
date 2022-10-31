import { dirname } from "dirname-filename-esm";
import fs from "node:fs/promises";
import path from "node:path";
import { Articles } from "../src/utils/zenn/schema";

const __dirname = dirname(import.meta);
const ZENN_DIR_PATH = path.join(__dirname, "..", "data", "zenn");
const ZENN_ARTICLES_PATH = path.join(ZENN_DIR_PATH, "articles.json");

async function createZennData() {
  const zennData = await fetchPublicationPosts();
  await fs.writeFile(ZENN_ARTICLES_PATH, JSON.stringify(zennData));
}

async function fetchPublicationPosts() {
  const res = await fetch(
    "https://zenn.dev/api/articles?publication_name=cybozu_frontend&count=96&order=latest"
  );
  const json = await res.json();

  return Articles.parse(json);
}

createZennData();
