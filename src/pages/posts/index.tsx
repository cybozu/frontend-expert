import { GetStaticProps } from "next";
import { Layout } from "../../components/Layout";
import { getAllPosts, PostData } from "../../utils/posts";
import { Posts } from "../../components/Posts";
import { PageLayout } from "../../components/PageLayout";
import { postsPerPage } from "../../utils/constants";
import { PostsPaginate } from "../../components/PostsPaginate";

type Props = {
  posts: PostData[];
  pageNum: number;
  totalPage: number;
};

const PostsPage = ({ posts, pageNum, totalPage }: Props) => (
  <Layout title="Posts">
    <PageLayout>
      <h2>Posts</h2>
      <Posts posts={posts} />
      <PostsPaginate pageNum={pageNum} totalPage={totalPage} />
    </PageLayout>
  </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllPosts();
  const totalPage = Math.ceil(posts.length / postsPerPage);
  const pageNum = 1;
  const start = (pageNum - 1) * postsPerPage;
  const end = start + postsPerPage;
  const sliced = posts.slice(start, end);

  return {
    props: { posts: sliced, totalPage, pageNum },
  };
};

export default PostsPage;
