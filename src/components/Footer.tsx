import { css } from "@emotion/react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer css={style}>
      <div className="content">
        <ul>
          <li>
            <a href="https://cybozu.co.jp/" target="_blank" rel="noreferrer">
              サイボウズ 企業情報
            </a>
          </li>
          <li>
            <a
              href="https://www.cybozu.com/jp/"
              target="_blank"
              rel="noreferrer"
            >
              cybozu.com
            </a>
          </li>
          <li>
            <a href="https://blog.cybozu.io/" target="_blank" rel="noreferrer">
              サイボウズエンジニアのブログ Cybozu Inside Out
            </a>
          </li>
          <li>
            <a href="https://tech.cybozu.io/" target="_blank" rel="noreferrer">
              Cybozu Tech
            </a>
          </li>
          <li>
            <a
              href="https://cybozu.co.jp/recruit/"
              target="_blank"
              rel="noreferrer"
            >
              採用情報
            </a>
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
