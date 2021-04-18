import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Layout } from "../../components/Layout";
import { PostContent } from "../../components/PostContent";
import {
  getAllPosts,
  getPostBySlug,
  MonthlyPostData,
} from "../../utils/frontend-monthly";
import "prismjs/themes/prism.css";
import { EventSummary } from "../../components/frontend-monthly/EventSummary";

type Props = {
  post: MonthlyPostData;
};
const PostPage = ({ post }: Props) => {
  const title = `Cybozu Frontend Monthly #${post.no}`;
  return (
    <Layout title={title}>
      <PostContent>
        <h1>{title}</h1>

        <EventSummary
          date={post.metaData.date}
          connpassUrl={post.metaData.connpass}
          streamUrl={post.metaData.streamUrl}
          memberNames={post.metaData.members}
          guests={post.metaData.guests}
        />

        <h2>紹介記事</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </PostContent>
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
