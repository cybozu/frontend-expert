import { FC } from "react";
import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <ul>
          <li>
            <a href="">サイボウズ 企業情報</a>
          </li>
          <li>
            <a href="">cybozu.com</a>
          </li>
          <li>
            <a href="">サイボウズエンジニアのブログ Cybozu Inside Out</a>
          </li>
          <li>
            <a href="">Cybozu Tech</a>
          </li>
          <li>
            <a href="">採用情報</a>
          </li>
        </ul>
        <small>Copyright &copy; Cybozu, Inc.</small>
      </div>
    </footer>
  );
};
