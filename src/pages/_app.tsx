import type { AppProps } from "next/app";
import "./theme.css";
import "./app.css";
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
