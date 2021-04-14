import Link from "next/link";
import { PostData } from "../utils/posts";
import styles from "./Posts.module.css";

type Props = {
  posts: PostData[];
};
export const Posts = ({ posts }: Props) => {
  return (
    <div>
      {posts.map(({ slug, metaData }) => (
        <div key={slug} className={styles.postItem}>
          <Link href={`/posts/${slug}`}>
            {`${metaData.createdAt} ${metaData.title}`}
          </Link>
        </div>
      ))}
    </div>
  );
};
