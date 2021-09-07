import { ReactNode } from "react";
import Head from "next/head";
import styles from "./Layout.module.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

const DEFAULT_PAGE_TITLE = "サイボウズ フロントエンドエキスパートチーム";
function createPageTitle(title?: string) {
  return title ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;
}

const SITE_NAME = "サイボウズ フロントエンドエキスパートチーム";
const DESCRIPTION = "Website by Cybozu Frontend Expert Team";
// TODO: set
const OG_IMAGE_URL = "";

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout = ({ children, title }: Props) => {
  const pageTitle = createPageTitle(title);
  return (
    <div className={styles.layout}>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={DESCRIPTION} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image " content={OG_IMAGE_URL} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Atom Feed"
          href="/feeds/atom.xml"
        />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
      <Footer />
    </div>
  );
};
