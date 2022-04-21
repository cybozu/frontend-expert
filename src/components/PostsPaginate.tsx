/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";

type Props = {
  pageNum: number;
  totalPage: number;
};
export const PostsPaginate = ({ pageNum, totalPage }: Props) => {
  const arr = Array.from({ length: totalPage }).map((_, k) => k + 1);

  return (
    <div css={style}>
      {arr.map((_pageNum, index) => {
        return pageNum !== _pageNum ? (
          <Link href={`/posts/page/${_pageNum}`} key={index} passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>{_pageNum}</a>
          </Link>
        ) : (
          /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
          <a className="isCurrentPage" key={index}>
            {_pageNum}
          </a>
        );
      })}
    </div>
  );
};

const style = css`
  margin-top: 40px;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  grid-gap: 8px;
  a {
    border: 1px solid #dedede;
    text-align: center;
    padding: 8px 16px;
    border-radius: 2px;
    &:hover {
      border-color: currentColor;
    }
  }
  .isCurrentPage {
    color: inherit;
    border-color: black;
  }
`;
