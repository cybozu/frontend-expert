import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { Layout } from "../../../components/Layout";
import { PageLayout } from "../../../components/PageLayout";
import { Posts } from "../../../components/Posts";
import { PostsPaginate } from "../../../components/PostsPaginate";
import { postsPerPage } from "../../../utils/constants";
import { getAllPosts, PostData } from "../../../utils/posts";

type Props = {
  posts: PostData[];
  totalPage: number;
  pageNum: number;
};
const PagerPage = ({ posts, pageNum, totalPage }: Props) => (
  <Layout title="Posts">
    <PageLayout>
      <h2>Posts</h2>
      <Posts posts={posts} />
      <PostsPaginate pageNum={pageNum} totalPage={totalPage} />
    </PageLayout>
  </Layout>
);
export default PagerPage;

interface Params extends ParsedUrlQuery {
  pageNum: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const posts = await getAllPosts();
  const totalPage = Math.ceil(posts.length / postsPerPage);
  const pageNum = parseInt(params?.pageNum || "1", 10);
  const start = (pageNum - 1) * postsPerPage;
  const end = start + postsPerPage;
  const sliced = posts.slice(start, end);

  return {
    props: { posts: sliced, totalPage, pageNum },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getAllPosts();
  const totalPage = Math.ceil(posts.length / postsPerPage);

  const paths = Array.from({ length: totalPage }, (_, k) => ({
    params: {
      pageNum: k + 1 + "",
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
