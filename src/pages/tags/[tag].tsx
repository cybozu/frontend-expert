import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Layout } from "../../components/Layout";
import { Posts } from "../../components/Posts";
import { getAllTags, getPostsByTag, PostData } from "../../utils/posts";

type Props = {
  tag: string;
  posts: PostData[];
};

const TagPage = ({ posts, tag }: Props) => {
  return (
    <Layout title={tag}>
      <h2>{tag}</h2>
      <Posts posts={posts} />
    </Layout>
  );
};

function assertContext(
  context: GetStaticPropsContext
): asserts context is { params: { tag: string } } {
  if (!context.params) {
    throw new Error("'context.params' is undefined");
  }
  if (typeof context.params.tag !== "string") {
    throw new Error("Unexpected 'tag' is array, expected string.");
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  assertContext(context);
  const tag = context.params.tag;
  const posts = await getPostsByTag(tag);
  return {
    props: { posts, tag },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getAllTags()).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
};

export default TagPage;
