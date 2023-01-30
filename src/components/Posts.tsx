import Link from "next/link";
import { PostData } from "../utils/posts";
import { MemberIcon } from "./MemberIcon";
import styles from "./css/Posts.module.css";
type Props = {
  posts: PostData[];
};

export const Posts = ({ posts }: Props) => {
  return (
    <div>
      {posts.map((post) => {
        const { slug, href, metaData } = post;

        return (
          <div key={slug} className={styles.item}>
            <Link href={href} passHref>
              <div className={styles.title}>{metaData.title}</div>
              <div className={styles.author}>
                <MemberIcon width={30} height={30} name={metaData.author} />
                <span className={styles.date}>{metaData.createdAt}</span>
              </div>
              <div className={styles.tags}>
                {metaData.tags.map((tag, index) => {
                  return (
                    <span className={styles.tag} key={index}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
