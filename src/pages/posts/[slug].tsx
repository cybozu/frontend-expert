import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Layout } from "../../components/Layout";
import { getAllPosts, getPostBySlug } from "../../utils/posts";
import type { PostData } from "../../utils/posts";
import styles from "./post.module.css";
import "prismjs/themes/prism.css";
import { getIconByName, getMemberByName, Member } from "../../utils/members";
import Image from "next/image";
import Link from "next/link";

const Author = ({ author }: { author: Member }) => {
  return (
    <div className={styles.author}>
      <Image
        width="60"
        height="60"
        alt={`${author.name} icon`}
        src={getIconByName(author.name)}
      />
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
      <h1 className={styles.title}>{post.metaData.title}</h1>
      <Author author={author} />
      <div className={styles.post}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
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
