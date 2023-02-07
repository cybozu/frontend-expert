"use client";
import { Posts } from "../../../components/Posts";
import { getAllPosts } from "../../posts/getAllPosts";

const getData = ({ tag }: { tag: string }) => {
  const allPosts = getAllPosts();
  const posts = allPosts.filter((post) => post.metaData.tags.includes(tag));
  return { posts };
};

type Params = {
  tag: string;
};

export const generateStaticParams = () => {
  const allPosts = getAllPosts();
  const tags = Array.from(
    new Set(
      allPosts
        .filter((post) => post.type === "markdown")
        .flatMap((post) => post.metaData.tags)
    )
  );

  return tags.map((tag) => {
    return {
      tag,
    };
  });
};

const TagPage = ({ params: { tag } }: { params: Params }) => {
  const { posts } = getData({ tag });

  return (
    <>
      <h2>{tag}</h2>
      <Posts posts={posts} />
    </>
  );
};

export default TagPage;
