import type { AppProps } from "next/app";
import "./theme.css";
import "./app.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
