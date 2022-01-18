import fs from "node:fs/promises";
import path from "node:path";
import format from "date-fns/formatRFC3339";
import parseDateString from "date-fns/parse";
// @ts-ignore
import { minify } from "minify-xml";
import { getPosts, WEBSITE_URL } from "./utils";

const OUT_DIR_PATH = path.join(__dirname, "..", "out");
const FEEDS_DIR = path.join(OUT_DIR_PATH, "feeds");
const FEEDS_ATOM_FILE_PATH = path.join(FEEDS_DIR, "atom.xml");
const WEBSITE_TITLE = "Cybozu Frontend Expert Team";

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

async function writeFeedFile(text: string) {
  try {
    await fs.mkdir(FEEDS_DIR);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw e;
    }
  }
  await fs.writeFile(FEEDS_ATOM_FILE_PATH, text);
}

async function generateFeedFile(): Promise<void> {
  const feedMeta = await getFeedMeta();
  const feedText = minify(generateAtom(feedMeta));
  await writeFeedFile(feedText);
  console.log(feedText);
}

async function getFeedMeta(): Promise<FeedMeta> {
  const entries = await getEntries();
  const feedMeta: FeedMeta = {
    title: WEBSITE_TITLE,
    id: WEBSITE_URL,
    authorName: WEBSITE_TITLE,
    siteUrl: WEBSITE_URL,
    feedUrl: `${WEBSITE_URL}/feeds/atom.xml`,
    updatedAt: format(new Date()),
    entries,
  };
  return feedMeta;
}

async function getEntries(): Promise<Entry[]> {
  const postMetaList = await getPosts();
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
