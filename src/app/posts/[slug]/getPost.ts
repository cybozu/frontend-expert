import { MarkdownPostData } from "../../../utils/posts";
import matter from "gray-matter";

type Value = {
  default: string;
};

type Props = {
  slug: string;
};

export const getPost = ({ slug }: Props): MarkdownPostData => {
  const post = ((context) => {
    const keys = context
      .keys()
      .filter((fileName) => /^\.\//.test(fileName))
      .filter((fileName) => fileName.indexOf(slug) !== -1);
    const key = keys[0];
    const value = context(key) as Value;
    const meta = matter(value.default);
    return {
      type: "markdown",
      metaData: meta.data,
      slug,
      href: `/posts/${slug}`,
      content: meta.content,
    } as MarkdownPostData;
  })(require.context("../../../../data/posts", true, /\.*\.md$/));
  return post;
};
