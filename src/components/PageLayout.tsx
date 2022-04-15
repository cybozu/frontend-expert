import { css } from "@emotion/css";
import { FC } from "react";

export const PageLayout: FC = ({ children }) => {
  return <div className={style}>{children}</div>;
};

const style = css`
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.75;
  }
`;
