import { css } from "@emotion/css";
import { FC } from "react";

export const PostContent: FC = ({ children }) => {
  return <div className={style}>{children}</div>;
};

const style = css`
  margin: 0 auto;
  h1 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 1.75rem;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    color: inherit;
    font-family: Montserrat, sans-serif;
    font-weight: 900;
    text-rendering: optimizeLegibility;
    font-size: 2.5rem;
    line-height: 1.1;
  }

  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.2rem;
  }

  h3 {
    margin-top: 1rem;
    font-size: 1.4rem;
  }

  h4 {
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  h5 {
    margin-top: 1rem;
    font-size: 1.4rem;
  }

  h6 {
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  table {
    width: 100%;
    font-size: 1rem;
  }

  img {
    display: block;
    margin: 0.5rem auto 0;
    max-width: 80%;
  }

  p {
    margin-top: 0.8rem;
    line-height: 1.75;
    font-size: 1rem;
  }

  li {
    margin-left: 1rem;
    font-size: 1rem;
  }

  ul {
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    box-sizing: border-box;
    line-height: 2;
    margin-left: 1rem;
  }

  ul ul {
    margin: 0;
  }

  ol {
    margin-top: 1rem;
    box-sizing: border-box;
  }

  hr {
    margin-top: 1rem;
  }

  a {
    word-wrap: break-word;
  }

  code:not([class*="language-"]) {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 0.8rem;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }

  .post table {
    margin-top: 1rem;
    display: block;
    width: 100%;
    overflow: auto;
  }

  .post table th {
    font-weight: 600;
  }

  .post table td,
  .post table th {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  .post table tr {
    border-top: 1px solid #c6cbd1;
  }
`;
