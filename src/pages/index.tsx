import Image from "next/legacy/image";
import { Layout } from "../components/Layout";
import { PageLayout } from "../components/PageLayout";
import styles from "../components/css/IndexPage.module.css";

const IndexPage = () => (
  <Layout>
    <PageLayout>
      <h2>Hello Cybozu Frontend Expert Team 👋</h2>
      <a
        href="https://speakerdeck.com/cybozuinsideout/frontendexpert-team"
        target="_blank"
        rel="noreferrer"
        className={styles.thumbnail}
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
        className={styles.link}
        href="https://speakerdeck.com/cybozuinsideout/frontendexpert-team"
        target="_blank"
        aria-hidden="true"
        rel="noreferrer"
      >
        https://speakerdeck.com/cybozuinsideout/frontendexpert-team
      </a>
    </PageLayout>
  </Layout>
);

export default IndexPage;
