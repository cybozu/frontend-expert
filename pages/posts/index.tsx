import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../src/components/Layout";
import { getAllPosts, PostData } from "../../src/utils/posts";

type Props = {
  posts: PostData[];
};

const Posts = ({ posts }: Props) => (
  <Layout title="記事一覧">
    <div>
      {posts.map(({ slug, metaData }) => (
        <div key={slug}>
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
