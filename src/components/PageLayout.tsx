import { ReactNode } from "react";
import styles from "./css/PageLayout.module.css";

type Props = {
  children: ReactNode;
};

export const PageLayout = ({ children }: Props) => {
  return <div className={styles.pageLayout}>{children}</div>;
};
