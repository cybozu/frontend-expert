import { FC } from "react";
import styles from "./PostContent.module.css";

export const PostContent: FC = ({ children }) => {
  return <div className={styles.post}>{children}</div>;
};
