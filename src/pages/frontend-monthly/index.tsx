import { GetStaticProps } from "next";
import { Layout } from "../../components/Layout";
import { getAllPosts, MonthlyPostData } from "../../utils/frontend-monthly";
import styles from "./frontend-monthly.module.css";
import Link from "next/link";

interface Props {
  posts: MonthlyPostData[];
}
const FrontendMonthlyPage = ({ posts }: Props) => {
  return (
    <Layout title="Frontend Monthly">
      <h2>Frontend Monthly</h2>
      <div>
        <p>
          サイボウズフロントエンドマンスリーは、サイボウズ社内で行っているフロントエンド情報共有会「フロントエンドウィークリー」の公開版です。
        </p>
        <p>
          その月に気になったフロントエンドの情報を、サイボウズのフロントエンドエキスパートチームのメンバーが共有していきます。
        </p>
        <p>
          このイベントのハッシュタグは #サイボウズフロントエンドマンスリー
          です。
        </p>
      </div>
      <div className={styles.postList}>
        {posts.map((post) => {
          return (
            <div className={styles.postItem} key={post.slug}>
              <Link href={`./${post.slug}`}>
                {`#${post.no} - ${post.slug}`}
              </Link>
            </div>
          );
        })}
      </div>
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
