import { GetStaticProps } from "next";
import { Layout } from "../../components/Layout";
import { getAllPosts, PostData } from "../../utils/posts";
import { Posts } from "../../components/Posts";
import { PageLayout } from "../../components/PageLayout";

type Props = {
  posts: PostData[];
};

const PostsPage = ({ posts }: Props) => (
  <Layout title="Posts">
    <PageLayout>
      <h2>Posts</h2>
      <Posts posts={posts} />
    </PageLayout>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: { posts },
  };
};

export default PostsPage;
