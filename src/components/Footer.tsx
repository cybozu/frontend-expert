import { css } from "@emotion/css";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className={style}>
      <div className="content">
        <ul>
          <li>
            <a href="https://cybozu.co.jp/">サイボウズ 企業情報</a>
          </li>
          <li>
            <a href="https://www.cybozu.com/jp/">cybozu.com</a>
          </li>
          <li>
            <a href="https://blog.cybozu.io/">
              サイボウズエンジニアのブログ Cybozu Inside Out
            </a>
          </li>
          <li>
            <a href="https://tech.cybozu.io/">Cybozu Tech</a>
          </li>
          <li>
            <a href="https://cybozu.co.jp/company/job/recruitment/">採用情報</a>
          </li>
        </ul>
        <small>Copyright &copy; Cybozu, Inc.</small>
      </div>
    </footer>
  );
};

const style = css`
  padding: 2.4rem 0;
  background-color: var(--primary-color);
  color: white;
  .content {
    max-width: var(--content-width);
    padding: 0 1.2rem;
    box-sizing: border-box;
    margin: 0 auto;
  }

  a {
    color: white;
  }

  ul {
    list-style: none;
    margin-bottom: 2.5rem;
  }

  ul li {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  small {
    font-size: 1rem;
  }
`;
