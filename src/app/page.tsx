import Image from "next/legacy/image";

const IndexPage = () => (
  <>
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
  </>
);

export default IndexPage;
