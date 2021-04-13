import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPosts, PostData } from "../../utils/posts";
import styles from "./posts.module.css";

type Props = {
  posts: PostData[];
};

const Posts = ({ posts }: Props) => (
  <Layout title="Posts">
    <h2>Posts</h2>
    <div>
      {posts.map(({ slug, metaData }) => (
        <div key={slug} className={styles.postItem}>
          <Link href={`/posts/${slug}`}>
            {`${metaData.createdAt} ${metaData.title}`}
          </Link>
        </div>
      ))}
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: { posts },
  };
};

export default Posts;
