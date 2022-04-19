import type { AppProps } from "next/app";
import "./app.css";
import "./theme.css";
import "prismjs/themes/prism.css";
import { GoogleAnalytics } from "nextjs-google-analytics";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />;
    </>
  );
};

export default MyApp;
