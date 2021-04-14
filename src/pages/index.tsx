import { Layout } from "../components/Layout";
import { SpeakerDeck } from "../components/SpeakerDeck";

const IndexPage = () => (
  <Layout>
    <h1>Hello Cybozu Frontend Expert Team 👋</h1>
    <SpeakerDeck
      embedId="0efec8a9dd224baebfb2aaf30fbe9a28"
      width="42rem"
      title="フロントエンドエキスパートチームについて"
    />
  </Layout>
);

export default IndexPage;
