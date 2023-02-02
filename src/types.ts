type PostMetaData = {
  title: string;
  author: string;
  createdAt: string;
  tags: string[];
};

type MarkdownPostMetaData = PostMetaData & {
  editor: string | string[];
  summary: string;
  updatedAt: string;
};

export type MarkdownPostData = {
  type: "markdown";
  slug: string;
  href: string;
  content: string;
  metaData: MarkdownPostMetaData;
};

export type ZennPostData = {
  type: "zenn";
  slug: string;
  href: string;
  metaData: PostMetaData;
};

export type PostData = MarkdownPostData | ZennPostData;
