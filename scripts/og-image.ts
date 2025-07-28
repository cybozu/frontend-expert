import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { dirname } from "dirname-filename-esm";
import { Browser, launch } from "puppeteer";
import { getPosts, PostData } from "./utils";
import { loadDefaultJapaneseParser } from "budoux";

const shouldPurgeImages = !!process.env.PURGE_IMAGES;

const __dirname = dirname(import.meta);
const OG_SOURCE_DIR_PATH = path.join(__dirname, "..", "data", "og");
const OG_SOURCE_HTML_FILE_PATH = path.join(OG_SOURCE_DIR_PATH, "og.html");
const OG_DIR_PATH = path.join(__dirname, "..", "public", "ogp", "posts");
const FALLBACK_OG_IMAGE_FILE_PATH = path.join(OG_DIR_PATH, "..", "ogp.jpg");

main();

async function main() {
  const posts = await getPosts();
  await captureOgImages(posts);
  await clearImages(posts);
  console.log("Done!");
}

function difference(setA: Set<string>, setB: Set<string>) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

async function clearImages(posts: PostData[]) {
  const images = new Set(
    (await fs.readdir(OG_DIR_PATH))
      .filter((name) => path.extname(name) === ".jpg")
      .map((name) => name.replace(/\.jpg$/, ""))
  );
  const postSlugs = new Set(posts.map(({ slug }) => slug));
  for (const slug of difference(images, postSlugs)) {
    await fs.rm(path.join(OG_DIR_PATH, slug + ".jpg"));
  }
}

async function captureOgImages(posts: PostData[]) {
  const browser = await launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  await captureOgImage(
    browser,
    "Cybozu Frontend Expert Team",
    FALLBACK_OG_IMAGE_FILE_PATH
  );
  for (const { title, slug } of posts) {
    const OG_IMAGE_FILE_PATH = `${OG_DIR_PATH}/` + slug + ".jpg";
    await captureOgImage(browser, title, OG_IMAGE_FILE_PATH);
  }
  await browser.close();
}

async function captureOgImage(
  browser: Browser,
  title: string,
  imagePath: string
) {
  if (shouldPurgeImages || !existsSync(imagePath)) {
    const parser = loadDefaultJapaneseParser();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1200,
      height: 630,
    });
    await page.goto("file://" + OG_SOURCE_HTML_FILE_PATH);
    await page.exposeFunction("getTitle", () =>
      parser.translateHTMLString(title)
    );
    await page.reload();
    await page.screenshot({
      path: imagePath as `${string}.jpeg`,
      type: "jpeg",
    });
    await page.close();
  }
}
