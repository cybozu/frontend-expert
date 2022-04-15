import { css } from "@emotion/css";
import { Layout } from "../components/Layout";
import { PageLayout } from "../components/PageLayout";

const IndexPage = () => (
  <Layout>
    <PageLayout>
      <h2>Hello Cybozu Frontend Expert Team 👋</h2>
      <a href="https://speakerdeck.com/cybozuinsideout/frontendexpert-team" target="_blank">
        <img className={style} src={"/frontend-expert/speakerdeck-thumbnail.png"} alt="フロントエンドエキスパートチームについて" />
      </a>
    </PageLayout>
  </Layout>
);

const style = css`
  width: 100%;
  height: auto;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
`

export default IndexPage;
