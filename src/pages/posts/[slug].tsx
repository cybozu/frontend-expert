import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Layout } from "../../components/Layout";
import { getAllPosts, getPostBySlug } from "../../utils/posts";
import type { PostData } from "../../utils/posts";
import styles from "./post.module.css";
import "prismjs/themes/prism.css";
import { getMemberByName, Member } from "../../utils/members";
import Link from "next/link";
import { MemberIcon } from "../../components/MemberIcon";
import { Tags } from "../../components/Tags";
import { PostContent } from "../../components/PostContent";

const Author = ({ author }: { author: Member }) => {
  return (
    <div className={styles.author}>
      <MemberIcon width="60" height="60" member={author} />
      <div className={styles.authorInfo}>
        <p className={styles.authorName}>
          <Link href={`/members/${author.name}`}>{author.name}</Link>
        </p>
        <ul>
          <li>
            <a href={`https://twitter.com/${author.twitterId}`}>Twitter</a>
          </li>
          <li>
            <a href={`https://github.com/${author.githubUsername}`}>GitHub</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

type Props = {
  post: PostData;
};

const Post = ({ post }: Props) => {
  const author = getMemberByName(post.metaData.author);
  return (
    <Layout title={post.metaData.title}>
      <Tags tags={post.metaData.tags} />
      <h1 className={styles.title}>{post.metaData.title}</h1>
      <Author author={author} />
      <PostContent content={post.content} />
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
