import { useEffect } from "react";
import styles from "./TweetButton.module.css";

declare global {
  interface Window {
    twttr: any;
  }
}

export const TweetButton = () => {
  useEffect(() => {
    window!.twttr!.widgets!.load();
  }, []);

  return (
    <p className={styles.tweetButton}>
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        className="twitter-share-button"
        data-show-count="false"
        data-lang="ja"
      >
        Tweet
      </a>
      <script src="https://platform.twitter.com/widgets.js" async />
    </p>
  );
};
