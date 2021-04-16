import fs from "fs";
import path from "path";
import matter from "gray-matter";

type MonthlyPostMetaData = {
  date: string;
  connpass: string;
  members: string[];
};

export type MonthlyPostData = {
  slug: string;
  no: number;
  content: string;
  metaData: MonthlyPostMetaData;
};

const monthlyPostsDirectoryPath = path.join(
  process.cwd(),
  "data",
  "frontend-monthly"
);

function getPostSlugs() {
  return fs.readdirSync(monthlyPostsDirectoryPath);
}

function assertMetaData(
  metaData: any
): asserts metaData is MonthlyPostMetaData {
  const missingProperties: Array<keyof MonthlyPostMetaData> = [];
  if (typeof metaData.date !== "string") {
    missingProperties.push("date");
  }
  if (typeof metaData.connpass !== "string") {
    missingProperties.push("connpass");
  }
  if (!Array.isArray(metaData.members)) {
    missingProperties.push("members");
  }
  if (missingProperties.length > 0) {
    throw new Error(`Missing meta data: ${missingProperties.join(", ")}`);
  }
}

export async function getPostBySlug(
  slug: string,
  index: number
): Promise<MonthlyPostData> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(monthlyPostsDirectoryPath, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  assertMetaData(data);

  return {
    slug: realSlug,
    no: index + 1,
    content,
    metaData: data,
  };
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  slugs.sort();
  const _posts = await Promise.all(
    slugs.map((slug, i) => getPostBySlug(slug, i))
  );
  const posts = _posts.sort((post1, post2) =>
    post1.metaData.date > post2.metaData.date ? -1 : 1
  );
  return posts;
}
