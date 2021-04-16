import styles from "./PostContent.module.css";

interface Props {
  content: string;
}

export const PostContent = ({ content }: Props) => {
  return (
    <div className={styles.post}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
