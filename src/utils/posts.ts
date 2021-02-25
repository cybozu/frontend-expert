import fs from "fs";
import path from "path";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";

type PostMetaData = {
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

export type PostData = {
  slug: string;
  contentSource: MdxRemote.Source;
  metaData: PostMetaData;
};

const postsDirectoryPath = path.join(process.cwd(), "posts");

function getPostSlugs() {
  return fs.readdirSync(postsDirectoryPath);
}

function assertMetaData(metaData: any): asserts metaData is PostMetaData {
  const missingProperties: Array<keyof PostMetaData> = [];
  if (!("title" in metaData)) {
    missingProperties.push("title");
  }
  if (!("author" in metaData)) {
    missingProperties.push("author");
  }
  if (!("createdAt" in metaData)) {
    missingProperties.push("createdAt");
  }
  if (!("updatedAt" in metaData)) {
    missingProperties.push("updatedAt");
  }
  if (missingProperties.length > 0) {
    throw new Error(`Missing meta data: ${missingProperties.join(", ")}`);
  }
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectoryPath, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (!data.updatedAt) data.updatedAt = data.createdAt;

  assertMetaData(data);

  return {
    slug: realSlug,
    contentSource: await renderToString(content),
    metaData: data,
  };
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  const _posts = await Promise.all(slugs.map(getPostBySlug));
  const posts = _posts.sort((post1, post2) =>
    post1.metaData.createdAt > post2.metaData.createdAt ? -1 : 1
  );
  return posts;
}
