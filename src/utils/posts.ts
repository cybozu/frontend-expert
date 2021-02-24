import fs from "fs";
import path from "path";

export type Post = {
  date: Date;
};

const postsDirectoryPath = path.join(process.cwd(), "posts");

function getPostSlugs() {
  return fs.readdirSync(postsDirectoryPath);
}

// @ts-expect-error
function getPostBySlug(slug: string): Post {}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(getPostBySlug)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
