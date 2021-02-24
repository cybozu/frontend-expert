import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../src/components/Layout";

type Props = {
  title: string;
};
const Post = ({ title }: Props) => <Layout title={title}></Layout>;

// @ts-expect-error
export const getStaticProps: GetStaticProps = async (context) => {};

// @ts-expect-error
export const getStaticPaths: GetStaticPaths = async (context) => {};

export default Post;
