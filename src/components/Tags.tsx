import { css } from "@emotion/react";
import Link from "next/link";

export const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div css={style}>
      {tags.map((tag) => {
        return (
          <Link key={tag} href={`/tags/${tag}`} passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- passHref で渡しているから */}
            <a className="tag">{tag}</a>
          </Link>
        );
      })}
    </div>
  );
};

const style = css`
  margin-top: 1.6rem;
  display: flex;
  justify-items: flex-end;

  .tag {
    font-size: 0.8rem;
    border: 1px solid #888;
    color: #444;
    padding: 0.2rem 0.4rem;
    cursor: pointer;
    margin-right: 0.8rem;
    border-radius: 2px;
  }
  .tag:link,
  .tag:visited {
    color: #444;
  }
`;
