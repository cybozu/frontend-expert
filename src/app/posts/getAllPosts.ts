import matter from "gray-matter";
import { PostData } from "../../utils/posts";
type Value = {
  default: string;
};

export const getAllPosts = () => {
  return ((context) => {
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
};
