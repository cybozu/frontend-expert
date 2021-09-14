import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR_PATH = path.join(__dirname, "..", "data", "posts");
const WEBSITE_URL = "https://cybozu.github.io/frontend-expert";

type PostData = {
  title: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
  summary: string;
  url: string;
  slug: string;
};

function assertPostMetaData(data: unknown): asserts data is PostData {
  // TODO: implement assertion
}

function getSummary(content: string): string {
  return content.slice(0, 50).replace(/\r?\n|\r/g, "");
}

async function getPosts(): Promise<PostData[]> {
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
        slug,
      };
      assertPostMetaData(meta);
      return meta;
    })
  );
}

export { getPosts, WEBSITE_URL };