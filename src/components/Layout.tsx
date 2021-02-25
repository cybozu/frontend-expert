import { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

const DEFAULT_PAGE_TITLE = "サイボウズ フロントエンドエキスパートチーム";
function createPageTitle(title?: string) {
  return title ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;
}

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title }: Props) => (
  <div>
    <Head>
      <title>{createPageTitle(title)}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <h1>
          <Link href="/">サイボウズ フロントエンドエキスパートチーム</Link>
        </h1>
        <Link href="/members">メンバー一覧</Link>
        <Link href="/posts">記事一覧</Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>Im here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;