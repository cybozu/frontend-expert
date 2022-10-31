import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { AuthorAndEditor } from "../../components/AuthorAndEditor";
import { Layout } from "../../components/Layout";
import { PostContact } from "../../components/PostContact";
import { PostContent } from "../../components/PostContent";
import { PostPublishedOn } from "../../components/PostPublishedOn";
import { PostTitle } from "../../components/PostTitle";
import { Tags } from "../../components/Tags";
import { TweetButton } from "../../components/TweetButton";
import { getMemberByName, getMembersByName } from "../../utils/members";
import {
  getAllPosts,
  getPostBySlug,
  MarkdownPostData,
} from "../../utils/posts";

type Props = {
  post: MarkdownPostData;
};

const Post = ({ post }: Props) => {
  const author = getMemberByName(post.metaData.author);
  const editors = post.metaData.editor
    ? getMembersByName(post.metaData.editor)
    : undefined;
  return (
    <Layout
      title={post.metaData.title}
      slug={post.slug}
      description={post.metaData.summary}
    >
      <PostTitle title={post.metaData.title} />
      <PostPublishedOn createdAt={post.metaData.createdAt} />
      <AuthorAndEditor author={author} editors={editors} />
      <PostContent>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </PostContent>
      <Tags tags={post.metaData.tags} />
      <TweetButton />
      <PostContact />
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
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) => post.type === "markdown");

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
