import styles from "./css/PostPublishedOn.module.css";
export const PostPublishedOn = ({ createdAt }: { createdAt: string }) => {
  return (
    <div className={styles.postPublishedOn}>
      Published on{" "}
      <time dateTime={createdAt} itemProp="datePublished">
        {createdAt}
      </time>
    </div>
  );
};
