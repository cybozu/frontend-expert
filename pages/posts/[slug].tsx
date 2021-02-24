import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../src/components/Layout";
import { getAllPosts, getPostBySlug } from "../../src/utils/posts";
import type { PostData } from "../../src/utils/posts";
import hydrate from "next-mdx-remote/hydrate";

type Props = {
  post: PostData;
};

const Post = ({ post }: Props) => {
  const content = hydrate(post.contentSource);
  return <Layout title={post.metaData.title}>{content}</Layout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  // @ts-ignore
  const post = await getPostBySlug(context.params.slug);

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default Post;
