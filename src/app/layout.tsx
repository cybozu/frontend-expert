import "./app.css";
import "./theme.css";
import "prismjs/themes/prism.css";
import { useMemo, FC } from "react";
import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
const SITE_NAME = "サイボウズ フロントエンドエキスパートチーム";
const SITE_URL = "https://cybozu.github.io/frontend-expert";
const DESCRIPTION =
  "サイボウズ フロントエンドエキスパートチームのウェブサイトです";

const DEFAULT_PAGE_TITLE = SITE_NAME;
function usePageTitle(title?: string) {
  return useMemo(
    () => (title ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE),
    [title]
  );
}

const OG_IMAGE_URL = SITE_URL + "/ogp/ogp.jpg";
function useOgImageUrl(slug?: string) {
  return useMemo(() => {
    if (slug) {
      return SITE_URL + "/ogp/posts/" + slug + ".jpg";
    }
    return OG_IMAGE_URL;
  }, [slug]);
}

type Props = {
  title?: string;
  slug?: string;
  description?: string;
  children: React.ReactNode;
};

export default function RootLayout({
  children,
  title,
  slug,
  description,
}: Props) {
  const pageTitle = usePageTitle(title);
  const ogImageUrl = useOgImageUrl(slug);
  const descriptionText = useMemo(() => {
    return description ?? DESCRIPTION;
  }, [description]);

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={descriptionText} />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/frontend-expert/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/frontend-expert/icons/favicon-16x16.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={descriptionText} />
        <meta name="twitter:image " content={ogImageUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:description" content={descriptionText} />
        <meta property="og:image" content={ogImageUrl} />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Atom Feed"
          href="/frontend-expert/feeds/atom.xml"
        />
      </Head>
      <Header />
      <main className="main">
        <div className="content">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

// const style = css`
//   width: 100%;

//   .main {
//     max-width: 100%;
//     background-color: white;
//   }

//   .main .content {
//     margin: 0 auto;
//     max-width: var(--content-width);
//     box-sizing: border-box;
//     padding: 1rem 1rem 1.5rem;
//     min-height: 400px;
//   }
// `;
