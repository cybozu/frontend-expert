import Link from "next/link";
import styles from "./css/Tags.module.css";
export const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => {
        return (
          <Link key={tag} href={`/tags/${tag}`} passHref className={styles.tag}>
            {tag}
          </Link>
        );
      })}
    </div>
  );
};
