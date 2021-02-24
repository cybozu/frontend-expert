import Layout from "../components/Layout";
import Link from "next/link";

const IndexPage = () => (
  <Layout>
    <h1>Hello Cybozu Frontend Expert Team 👋</h1>
    <Link href="/members">メンバー</Link>
  </Layout>
);

export default IndexPage;
