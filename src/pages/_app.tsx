import type { AppProps } from "next/app";
import "./theme.css";
import "./app.css";
import { GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";

const MyApp = ({ Component, pageProps }: AppProps) => {
  usePagesViews();
  
  return <>
    <GoogleAnalytics/>
    <Component {...pageProps} />;
  </>
};

export default MyApp;
