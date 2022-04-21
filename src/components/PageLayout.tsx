/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

export const PageLayout: FC = ({ children }) => {
  return <div css={style}>{children}</div>;
};

const style = css`
  h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.75;
  }
`;
