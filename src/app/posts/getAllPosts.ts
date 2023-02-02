import matter from "gray-matter";
import { PostData } from "../../types";
import { getZennPosts } from "./getZennPosts";
type Value = {
  default: string;
};

export const getAllPosts = () => {
  const zennPosts = getZennPosts();
  const markdownPosts = ((context) => {
    const keys = context.keys().filter((fileName) => /^\.\//.test(fileName));
    const values = keys.map(context);
    const data = keys.map((key, index) => {
      const slug = key.replace(/^.*[\\/]/, "").slice(0, -3);
      const value = values[index] as Value;
      const meta = matter(value.default);
      return {
        type: "markdown",
        metaData: meta.data,
        slug,
        href: `/posts/${slug}`,
      };
    });
    return data;
  })(require.context("../../../data/posts", true, /\.*\.md$/)) as PostData[];

  const allPosts = [...markdownPosts, ...zennPosts];

  return allPosts.sort((post1, post2) =>
    post1.metaData.createdAt > post2.metaData.createdAt ? -1 : 1
  );
};
