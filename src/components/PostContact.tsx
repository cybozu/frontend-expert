import { css } from "@emotion/react";

export const PostContact = () => {
  return (
    <div css={style}>
      記事に関する報告などは
      <a
        href="https://github.com/cybozu/frontend-expert/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        こちら
      </a>
      から
    </div>
  );
};

const style = css`
  font-size: 0.9rem;
  text-align: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ccc;
`;
