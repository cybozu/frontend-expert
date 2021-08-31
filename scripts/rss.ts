import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import format from "date-fns/formatRFC3339";
import parseDateString from "date-fns/parse";
// @ts-ignore
import { minify } from "minify-xml";

const OUT_DIR_PATH = path.join(__dirname, "..", "out");
const POSTS_DIR_PATH = path.join(__dirname, "..", "data", "posts");
const RSS_FEED_FILE_PATH = path.join(OUT_DIR_PATH, "feed.xml");
const WEBSITE_TITLE = "Cybozu Frontend Expert Team";
const WEBSITE_URL = "https://cybozu.github.io/frontend-expert";

generateFeedFile()
  .then(() => {
    console.log("Done");
  })
  .catch((error) => {
    throw error;
  });

type FeedMeta = {
  title: string;
  id: string;
  authorName: string;
  siteUrl: string;
  feedUrl: string;
  updatedAt: string;
  entries: Entry[];
};

type Entry = {
  title: string;
  id: string;
  entryUrl: string;
  updatedAt: string;
  summary: string;
};

type PostData = {
  title: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
  summary: string;
  url: string;
};

async function generateFeedFile(): Promise<void> {
  const feedMeta = await getFeedMeta();
  const feedText = minify(generateAtom(feedMeta));
  await fs.writeFile(RSS_FEED_FILE_PATH, feedText);
  console.log(feedText);
}

async function getFeedMeta(): Promise<FeedMeta> {
  const entries = await getEntries();
  const feedMeta: FeedMeta = {
    title: WEBSITE_TITLE,
    id: WEBSITE_URL,
    authorName: WEBSITE_TITLE,
    siteUrl: WEBSITE_URL,
    feedUrl: `${WEBSITE_URL}/feed.xml`,
    updatedAt: format(new Date()),
    entries,
  };
  return feedMeta;
}

async function getEntries(): Promise<Entry[]> {
  const postMetaList = await getPostMetaList();
  return postMetaList.map((postMeta) => {
    const updatedAt = format(
      parseDateString(
        postMeta.updatedAt ?? postMeta.createdAt,
        "yyyy-MM-dd",
        new Date()
      )
    );
    return {
      title: postMeta.title,
      id: postMeta.url,
      entryUrl: postMeta.url,
      updatedAt,
      summary: postMeta.summary,
    };
  });
}

async function getPostMetaList(): Promise<PostData[]> {
  const postFileNames = await fs.readdir(POSTS_DIR_PATH);
  return await Promise.all(
    postFileNames.map(async (fileName) => {
      const filePath = path.join(POSTS_DIR_PATH, fileName);
      const slug = fileName.replace(/\.md$/, "");
      const postUrl = `${WEBSITE_URL}/posts/${slug}`;
      const fileData = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(fileData);
      const meta = {
        ...data,
        url: postUrl,
        summary: getSummary(content),
      };
      assertPostMetaData(meta);
      return meta;
    })
  );
}

function assertPostMetaData(data: unknown): asserts data is PostData {
  // TODO: implement assertion
}

function getSummary(content: string): string {
  return content.slice(0, 50).replace(/\r?\n|\r/g, "");
}

function generateEntryAtom({
  title,
  id,
  entryUrl,
  updatedAt,
  summary,
}: Entry): string {
  return /* HTML */ `<entry>
    <title>${title}</title>
    <id>${id}</id>
    <link rel="alternate" type="text/html" href="${entryUrl}" />
    <updated>${updatedAt}</updated>
    <summary>${summary}</summary>
  </entry>`;
}

function generateEntriesAtom(entries: Entry[]): string {
  return entries.map(generateEntryAtom).join("\n");
}

function generateAtom({
  title,
  id,
  authorName,
  siteUrl,
  feedUrl,
  updatedAt,
  entries,
}: FeedMeta): string {
  return /* HTML */ `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
      <title>${title}</title>
      <id>${id}</id>
      <author>
        <name>${authorName}</name>
      </author>
      <link rel="alternate" type="text/html" href="${siteUrl}" />
      <link rel="self" type="application/atom+xml" href="${feedUrl}" />
      <updated>${updatedAt}</updated>
      ${generateEntriesAtom(entries)}
    </feed>`;
}
