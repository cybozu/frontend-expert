import { GetStaticProps } from "next";
import { Layout } from "../../components/Layout";
import { getAllPosts, MonthlyPostData } from "../../utils/frontend-monthly";
import styles from "./frontend-monthly.module.css";
import Link from "next/link";
import { Description } from "../../components/frontend-monthly/Description";
import { PageLayout } from "../../components/PageLayout";

interface Props {
  posts: MonthlyPostData[];
}
const FrontendMonthlyPage = ({ posts }: Props) => {
  return (
    <Layout title="Frontend Monthly">
      <PageLayout>
        <h2>Frontend Monthly</h2>
        <Description />
        <div className={styles.postList}>
          {posts.map((post) => {
            return (
              <div className={styles.postItem} key={post.slug}>
                <Link
                  href={`/frontend-monthly/${post.slug}`}
                >{`#${post.no} - ${post.slug}`}</Link>
              </div>
            );
          })}
        </div>
      </PageLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: { posts },
  };
};

export default FrontendMonthlyPage;
