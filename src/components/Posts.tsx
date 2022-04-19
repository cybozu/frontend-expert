/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import { PostData } from "../utils/posts";

type Props = {
  posts: PostData[];
};
export const Posts = ({ posts }: Props) => {
  return (
    <div css={style}>
      {posts.map(({ slug, metaData }) => (
        <div key={slug} className="item">
          <Link href={`/posts/${slug}`}>
            {`${metaData.createdAt} ${metaData.title}`}
          </Link>
        </div>
      ))}
    </div>
  );
};

const style = css`
  .item {
    font-size: 1.1rem;
    margin: 1.2rem 0;
  }
`;
