import { FC } from "react";
import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
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
