import { GetStaticProps } from "next";
import { Layout } from "../../components/Layout";
import { getAllTags } from "../../utils/posts";
import { Tags } from "../../components/Tags";

type Props = {
  tags: string[];
};

const TagsPage = ({ tags }: Props) => {
  return (
    <Layout title="Tags">
      <h2>Tags</h2>
      <Tags tags={tags} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tags = await getAllTags();
  return {
    props: { tags },
  };
};

export default TagsPage;
