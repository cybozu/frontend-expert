import { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "./Layout.module.css";

const DEFAULT_PAGE_TITLE = "サイボウズ フロントエンドエキスパートチーム";
function createPageTitle(title?: string) {
  return title ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;
}

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout = ({ children, title }: Props) => (
  <div className={styles.layout}>
    <Head>
      <title>{createPageTitle(title)}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className={styles.header}>
      <h1>
        <Link href="/">Cybozu Frontend Expert Team</Link>
      </h1>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/members">Members</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main className={styles.main}>{children}</main>
    <footer>
      <hr />
      <span>Im here to stay (Footer)</span>
    </footer>
  </div>
);
