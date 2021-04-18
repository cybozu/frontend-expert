import { FC } from "react";
import styles from "./PageLayout.module.css";

export const PageLayout: FC = ({ children }) => {
  return <div className={styles.pageLayout}>{children}</div>;
};
