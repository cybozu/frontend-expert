import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";

type PostMetaData = {
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
};

export type PostData = {
  slug: string;
  content: string;
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
  if (!("tags" in metaData)) {
    missingProperties.push("tags");
  }
  if (missingProperties.length > 0) {
    throw new Error(`Missing meta data: ${missingProperties.join(", ")}`);
  }
}

async function markdownToHtml(markdownContent: string): Promise<string> {
  const result = await remark().use(html).use(prism).process(markdownContent);
  return result.toString();
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectoryPath, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (!data.updatedAt) data.updatedAt = data.createdAt;
  if (!data.tags) {
    data.tags = [];
  } else {
    data.tags = Array.from(new Set(data.tags));
  }

  assertMetaData(data);

  return {
    slug: realSlug,
    content: await markdownToHtml(content),
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

export async function getPostsByAuthor(authorName: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.metaData.author === authorName);
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.metaData.tags)));
  return tags;
}
