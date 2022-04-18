import { css } from "@emotion/css";
import Script from "next/script";

export const TweetButton = () => {
  return (
    <>
      <Script src="https://platform.twitter.com/widgets.js" />

      <p className={style}>
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

const style = css`
  margin-top: 32px;
`;
