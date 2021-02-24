import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../src/components/Layout";
import { getAllPosts, getPostBySlug } from "../../src/utils/posts";

type Props = {
  title: string;
};
const Post = ({ title }: Props) => <Layout title={title} />;

export const getStaticProps: GetStaticProps = async (context) => {
  // @ts-ignore
  const post = getPostBySlug(context.params.slug);

  console.log(post);

  return {
    props: post,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

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
