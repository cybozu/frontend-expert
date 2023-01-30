import Link from "next/link";
import styles from "./css/PostPaginate.module.css";
type Props = {
  pageNum: number;
  totalPage: number;
};
export const PostsPaginate = ({ pageNum, totalPage }: Props) => {
  const arr = Array.from({ length: totalPage }).map((_, k) => k + 1);

  return (
    <div className={styles.postPaginate}>
      {arr.map((_pageNum, index) => {
        return pageNum !== _pageNum ? (
          <Link href={`/posts/page/${_pageNum}`} key={index} passHref>
            {_pageNum}
          </Link>
        ) : (
          /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
          <a className={styles.isCurrentPage} key={index}>
            {_pageNum}
          </a>
        );
      })}
    </div>
  );
};
