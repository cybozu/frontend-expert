/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

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
      <p css={style}>
        <a href={href} className="tweetButton" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
          ツイート
        </a>
      </p>
    </>
  );
};

const style = css`
  margin-top: 32px;
  .tweetButton {
    width: 88px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    font-size: 12px;
    background-color: #1d9bf0;
    position: relative;
    height: 20px;
    box-sizing: border-box;
    padding: 1px 12px 1px 12px;
    color: #fff;
    border-radius: 9999px;
    font-weight: 500;
    cursor: pointer;
    vertical-align: top;
    &:hover {
      background-color: #0c7abf;
    }
    svg {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 4px;
    }
  }
`;
