import matter from "gray-matter";
import { Posts } from "../../../../components/Posts";
import { PostsPaginate } from "../../../../components/PostsPaginate";
import { postsPerPage } from "../../../../utils/constants";
import { PostData } from "../../../../utils/posts";
type Value = {
  default: string;
};

type Params = {
  pageNum?: string;
};

const PostsPage = async ({ params }: { params: Params }) => {
  const allPosts = ((context) => {
    const keys = context.keys().filter((fileName) => /^\.\//.test(fileName));
    const values = keys.map(context);
    const data = keys.map((key, index) => {
      const slug = key.replace(/^.*[\\/]/, "").slice(0, -3);
      const value = values[index] as Value;
      const meta = matter(value.default);
      return {
        type: "markdown",
        metaData: meta.data,
        slug,
        href: `/posts/${slug}`,
      };
    });
    return data;
  })(
    require.context("../../../../../data/posts", true, /\.*\.md$/)
  ) as PostData[];
  const totalPage = Math.ceil(allPosts.length / postsPerPage);
  const pageNum = parseInt(params?.pageNum || "1", 10);
  const start = (pageNum - 1) * postsPerPage;
  const end = start + postsPerPage;
  const posts = allPosts
    .sort((post1, post2) =>
      post1.metaData.createdAt > post2.metaData.createdAt ? -1 : 1
    )
    .slice(start, end);

  return (
    <div>
      <h2>Posts</h2>
      <Posts posts={posts} />
      <PostsPaginate pageNum={pageNum} totalPage={totalPage} />
    </div>
  );
};

export default PostsPage;
