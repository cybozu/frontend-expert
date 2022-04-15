import { css } from "@emotion/css";
import Script from "next/script";
import { useRef } from "react";

export const TweetButton = () => {
  const buttonEl = useRef(null);
  return (
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        onLoad={() => {
          (window as any).twttr?.widgets?.load(buttonEl.current);
        }}
      />

      <p className={style}>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          className="twitter-share-button"
          data-show-count="false"
          data-lang="ja"
          ref={buttonEl}
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
