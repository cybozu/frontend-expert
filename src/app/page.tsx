"use client";
// import { css } from "@emotion/css";
import Image from "next/legacy/image";
import { PageLayout } from "../components/PageLayout";

const IndexPage = () => (
  <PageLayout>
    <h2>Hello Cybozu Frontend Expert Team 👋</h2>
    <a
      href="https://speakerdeck.com/cybozuinsideout/frontendexpert-team"
      target="_blank"
      rel="noreferrer"
      // className={thubnmailStyle}
    >
      <Image
        unoptimized
        src="/frontend-expert/speakerdeck-thumbnail.png"
        alt="フロントエンドエキスパートチームについて"
        width="1200"
        height="889"
      />
    </a>
    <a
      // className={linkStyle}
      href="https://speakerdeck.com/cybozuinsideout/frontendexpert-team"
      target="_blank"
      aria-hidden="true"
      rel="noreferrer"
    >
      https://speakerdeck.com/cybozuinsideout/frontendexpert-team
    </a>
  </PageLayout>
);

// const thubnmailStyle = css`
//   border: 1px solid #dbdbdb;
//   border-radius: 3px;
//   display: block;
// `;

// const linkStyle = css`
//   margin-top: 8px;
//   display: block;
//   text-align: right;
//   font-size: 0.8em;
// `;

export default IndexPage;
