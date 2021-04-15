import Link from "next/link";
import styles from "./Tags.module.css";

export const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => {
        return (
          <Link key={tag} href={`/tags/${tag}`}>
            <div className={styles.tag}>{tag}</div>
          </Link>
        );
      })}
    </div>
  );
};
