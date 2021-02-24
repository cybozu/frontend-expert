import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Layout from "../../src/components/Layout";
import { getAllPosts, getPostBySlug } from "../../src/utils/posts";
import type { PostData } from "../../src/utils/posts";
import hydrate from "next-mdx-remote/hydrate";
import styles from "./post.module.css";

type Props = {
  post: PostData;
};

const Post = ({ post }: Props) => {
  const content = hydrate(post.contentSource);
  return (
    <Layout title={post.metaData.title}>
      <div className={styles.post}>{content}</div>
    </Layout>
  );
};

function assertContextForPost(
  context: GetStaticPropsContext
): asserts context is { params: { slug: string } } {
  if (!context.params) {
    throw new Error("'context.params' is undefined");
  }
  if (Array.isArray(context.params.slug)) {
    throw new Error("Unexpected 'slug' is array, expected string.");
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  assertContextForPost(context);
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
