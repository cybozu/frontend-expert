import { useEffect } from "react";
import styles from "./TweetButton.module.css";

export const TweetButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <p className={styles.tweetButton}>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          className="twitter-share-button"
          data-show-count="false"
          data-lang="ja"
        >
          Tweet
        </a>
      </p>
    </>
  );
};
