import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { FrontendMonthlyDescription } from "../../components/FrontendMonthlyDescription";
import { Layout } from "../../components/Layout";
import { PostContent } from "../../components/PostContent";
import {
  getAllPosts,
  getPostBySlug,
  MonthlyPostData,
} from "../../utils/frontend-monthly";
import "prismjs/themes/prism.css";

type Props = {
  post: MonthlyPostData;
};
const PostPage = ({ post }: Props) => {
  const title = `Cybozu Frontend Monthly #${post.no}`;
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <FrontendMonthlyDescription />
      <h2>開催日</h2>
      <p>{post.metaData.date}</p>
      <h2>イベントページ</h2>
      <a href={post.metaData.connpass}>{post.metaData.connpass}</a>
      <h2>紹介記事</h2>
      <PostContent content={post.content} />
    </Layout>
  );
};

function assertContext(
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
  assertContext(context);
  const post = await getPostBySlug(context.params.slug);
  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export default PostPage;
