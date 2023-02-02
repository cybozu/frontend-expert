import { Posts } from "../../components/Posts";
import { PostsPaginate } from "../../components/PostsPaginate";
import { postsPerPage } from "../constants";
import { getAllPosts } from "./getAllPosts";

const PostsPage = async () => {
  const allPosts = getAllPosts();
  const totalPage = Math.ceil(allPosts.length / postsPerPage);
  const pageNum = 1;
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
