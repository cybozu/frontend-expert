"use client";
import { AuthorAndEditor } from "../../../components/AuthorAndEditor";
import { PostContact } from "../../../components/PostContact";
import { PostContent } from "../../../components/PostContent";
import { PostPublishedOn } from "../../../components/PostPublishedOn";
import { PostTitle } from "../../../components/PostTitle";
import { Tags } from "../../../components/Tags";
import { TweetButton } from "../../../components/TweetButton";
import { getMemberByName, getMembersByName } from "../../../utils/members";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { hatenaLinkCard } from "../../../utils/markdown/unifiedPlugins/hatenaLinkCard";
import { attachSizeToImage } from "../../../utils/markdown/unifiedPlugins/attachSizeToImage";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { getPost } from "./getPost";
import rehypeRaw from "rehype-raw";

type Params = {
  slug: string;
};

const PostPage = ({ params }: { params: Params }) => {
  const post = getPost({ slug: params.slug });
  const author = getMemberByName(post.metaData.author);
  const editors = post.metaData.editor
    ? getMembersByName(post.metaData.editor)
    : undefined;

  return (
    <>
      <PostTitle title={post.metaData.title} />
      <PostPublishedOn createdAt={post.metaData.createdAt} />
      <AuthorAndEditor author={author} editors={editors} />
      <PostContent>
        <ReactMarkdown
          skipHtml={false}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[gfm, hatenaLinkCard, attachSizeToImage]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  style={prism}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </PostContent>
      <Tags tags={post.metaData.tags} />
      <TweetButton />
      <PostContact />
    </>
  );
};

export default PostPage;
