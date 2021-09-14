import fs from "fs/promises";
import path from "path";
import puppeteer from "puppeteer";
import { getPosts, PostData } from "./utils";

const OG_SOURCE_DIR_PATH = path.join(__dirname, "..", "data", "og");
const OG_SOURCE_HTML_FILE_PATH = path.join(OG_SOURCE_DIR_PATH, "og.html");
const OG_DIR_PATH = path.join(__dirname, "..", "public", "ogp", "posts");

main();

async function main() {
  const posts = await getPosts();
  await captureOgImages(posts);
  await clearImages(posts);
  console.log("Done!");
}

function difference(setA: Set<string>, setB: Set<string>) {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

async function clearImages(posts: PostData[]) {
  const images = new Set(
    (await fs.readdir(OG_DIR_PATH)).map((name) => name.replace(/\.jpg$/, ""))
  );
  const postSlugs = new Set(posts.map(({ slug }) => slug));
  for (const slug of difference(images, postSlugs)) {
    await fs.rm(path.join(OG_DIR_PATH, slug + ".jpg"));
  }
}

async function captureOgImages(posts: PostData[]) {
  const browser = await puppeteer.launch();
  for (const { title, slug } of posts) {
    const page = await browser.newPage();
    await page.setViewport({
      width: 1200,
      height: 630,
    });
    await page.goto("file://" + OG_SOURCE_HTML_FILE_PATH);
    await page.exposeFunction("getTitle", () => title);
    await page.reload();
    await page.screenshot({
      path: `${OG_DIR_PATH}/` + slug + ".jpg",
      type: "jpeg",
    });
    await page.close();
  }
  await browser.close();
}
