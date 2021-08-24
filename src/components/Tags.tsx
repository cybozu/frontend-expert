import Link from "next/link";
import styles from "./Tags.module.css";

export const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => {
        return (
          <Link key={tag} href={`/tags/${tag}`} passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- passHref で渡しているから */}
            <a className={styles.tag}>{tag}</a>
          </Link>
        );
      })}
    </div>
  );
};
