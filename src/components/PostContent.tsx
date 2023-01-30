import { ReactNode } from "react";
import styles from "./css/PostContent.module.css";

type Props = {
  children: ReactNode;
};
export const PostContent = ({ children }: Props) => {
  return <div className={styles.postContent}>{children}</div>;
};
