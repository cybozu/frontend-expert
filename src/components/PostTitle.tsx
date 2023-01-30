import { loadDefaultJapaneseParser } from "budoux";
import styles from "./css/PostTitle.module.css";
const parser = loadDefaultJapaneseParser();

export const PostTitle = ({ title }: { title: string }) => {
  return (
    <h2
      css={styles.postTitle}
      dangerouslySetInnerHTML={{
        __html: parser.translateHTMLString(title),
      }}
    />
  );
};
