import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import { markdownToHtml } from "./markdown/markdownToHtml";
import { zennMemberMap } from "./members";
import { getZennData } from "./zenn/getZennData";

type PostMetaData = {
  title: string;
  author: string;
  createdAt: string;
  tags: string[];
};

type MarkdownPostMetaData = PostMetaData & {
  editor: string | string[];
  summary: string;
  updatedAt: string;
};

export type MarkdownPostData = {
  type: "markdown";
  slug: string;
  href: string;
  content: string;
  metaData: MarkdownPostMetaData;
};

export type ZennPostData = {
  type: "zenn";
  slug: string;
  href: string;
  metaData: PostMetaData;
};

export type PostData = MarkdownPostData | ZennPostData;

const postsDirectoryPath = path.join(process.cwd(), "data", "posts");

function getPostSlugs() {
  return fs.readdirSync(postsDirectoryPath);
}

function assertMetaData(
  metaData: any
): asserts metaData is MarkdownPostMetaData {
  const missingProperties: Array<keyof MarkdownPostMetaData> = [];
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
  if (!("summary" in metaData)) {
    missingProperties.push("summary");
  }
  if (missingProperties.length > 0) {
    throw new Error(`Missing meta data: ${missingProperties.join(", ")}`);
  }
}

export function isMarkdownPostData(post: PostData): post is MarkdownPostData {
  return post.type === "markdown";
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
    type: "markdown",
    href: `/posts/${realSlug}`,
    slug: realSlug,
    content: await markdownToHtml(content),
    metaData: data,
  };
}

let posts: PostData[];

const formatZennDate = (dateString: string) => {
  const localeString = new Date(dateString).toLocaleDateString("ja-JP");
  const [y, m, d] = localeString.split("/");
  return `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

export async function getAllPosts() {
  if (posts) {
    return posts;
  }

  const slugs = getPostSlugs();

  const _markdownPosts = await Promise.all(slugs.map(getPostBySlug));
  const _zennPosts = getZennData()
    .articles.filter((article) => !!zennMemberMap[article.user.username])
    .map(
      (article): ZennPostData => ({
        type: "zenn",
        slug: `__zenn-${article.slug}`,
        href: `https://zenn.dev${article.path}`,
        metaData: {
          title: `${article.emoji} ${article.title}`,
          author: zennMemberMap[article.user.username].name,
          createdAt: formatZennDate(article.published_at),
          tags: ["zenn"],
        },
      })
    );
  const _posts = [..._markdownPosts, ..._zennPosts];

  return _posts.sort((post1, post2) =>
    post1.metaData.createdAt > post2.metaData.createdAt ? -1 : 1
  );
}

export async function getPostsByAuthor(authorName: string) {
  posts = await getAllPosts();
  return posts.filter((post) => post.metaData.author === authorName);
}

export async function getAllTags() {
  posts = await getAllPosts();
  const tags = Array.from(
    new Set(
      posts
        .filter((post): post is MarkdownPostData => isMarkdownPostData(post))
        .flatMap((post) => post.metaData.tags)
    )
  );
  return tags;
}

export async function getPostsByTag(tag: string) {
  posts = await getAllPosts();
  return posts.filter(
    (post) => isMarkdownPostData(post) && post.metaData.tags.includes(tag)
  );
}
