import fs from "fs";
import path from "path";
import matter from "gray-matter";

type PostMetaData = {
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  slug: string;
  content: string;
  metaData: PostMetaData;
};

const postsDirectoryPath = path.join(process.cwd(), "posts");

function getPostSlugs() {
  return fs.readdirSync(postsDirectoryPath);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectoryPath, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (!data.updatedAt) data.updatedAt = data.createdAt;

  return {
    slug: realSlug,
    content,
    metaData: data as PostMetaData,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(getPostBySlug)
    .sort((post1, post2) =>
      post1.metaData.createdAt > post2.metaData.createdAt ? -1 : 1
    );
  return posts;
}
