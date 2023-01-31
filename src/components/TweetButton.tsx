"use client";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "./css/TweetButton.module.css";

const twitterBaseUrl = "https://twitter.com/intent/tweet";
export const TweetButton = () => {
  const [href, setHref] = useState("");

  useEffect(() => {
    const text = document.title;
    const url = location.origin + location.pathname;
    setHref(
      `${twitterBaseUrl}?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`
    );
  }, []);

  return (
    <>
      <p className={styles.tweetButtonOuter}>
        <a
          href={href}
          className={styles.tweetButton}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
          ツイート
        </a>
      </p>
    </>
  );
};
