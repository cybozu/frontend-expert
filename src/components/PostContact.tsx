import styles from "./PostContact.module.css";

export const PostContact = () => {
  return (
    <div className={styles.postContact}>
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
