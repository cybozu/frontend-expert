import path from "path";
import puppeteer from "puppeteer";
import { getPosts } from "./utils";

const OG_SOURCE_DIR_PATH = path.join(__dirname, "..", "data", "og");
const OG_SOURCE_HTML_FILE_PATH = path.join(OG_SOURCE_DIR_PATH, "og.html");
const OG_DIR_PATH = path.join(__dirname, "..", "public", "ogp", "posts");

captureOgImagess()
  .then(() => {
    console.log("Done");
  })
  .catch((e) => {
    throw e;
  });

async function captureOgImagess() {
  const browser = await puppeteer.launch();
  const posts = await getPosts();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 630,
  });
  await page.goto("file://" + OG_SOURCE_HTML_FILE_PATH);
  for (const { title, slug } of posts) {
    await page.exposeFunction("getTitle", () => title);
    await page.reload();
    await page.screenshot({
      path: `${OG_DIR_PATH}/` + slug + ".jpg",
      type: "jpeg",
    });
  }
  await browser.close();
}
