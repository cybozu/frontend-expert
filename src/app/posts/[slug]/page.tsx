import { AuthorAndEditor } from "../../../components/AuthorAndEditor";
import { PostContact } from "../../../components/PostContact";
import { PostContent } from "../../../components/PostContent";
import { PostPublishedOn } from "../../../components/PostPublishedOn";
import { PostTitle } from "../../../components/PostTitle";
import { Tags } from "../../../components/Tags";
import { TweetButton } from "../../../components/TweetButton";
import { markdownToHtml } from "../../../utils/markdown/markdownToHtml";
import { getMemberByName, getMembersByName } from "../../../utils/members";
import { getPost } from "./getPost";

type Params = {
  slug: string;
};

const PostPage = async ({ params }: { params: Params }) => {
  const post = getPost({ slug: params.slug });
  const author = getMemberByName(post.metaData.author);
  const editors = post.metaData.editor
    ? getMembersByName(post.metaData.editor)
    : undefined;
  const html = await markdownToHtml(post.content);

  return (
    <>
      <PostTitle title={post.metaData.title} />
      <PostPublishedOn createdAt={post.metaData.createdAt} />
      <AuthorAndEditor author={author} editors={editors} />
      <PostContent>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </PostContent>
      <Tags tags={post.metaData.tags} />
      <TweetButton />
      <PostContact />
    </>
  );
};

export default PostPage;
