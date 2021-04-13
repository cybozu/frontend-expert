import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPosts, PostData } from "../../utils/posts";

type Props = {
  posts: PostData[];
};

const Posts = ({ posts }: Props) => (
  <Layout title="Posts">
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
