import { MemberDetail } from "../../../components/MemberDetail";
import { Posts } from "../../../components/Posts";
import styles from "./MemberPage.module.css";
import { getMemberByName, members } from "../members";
import { getAllPosts } from "../../posts/getAllPosts";

// export const generateStaticParams = () => {
//   return members.map(({ name }) => ({ name }));
// };

const getData = ({ name }: { name: string }) => {
  const member = getMemberByName(name);
  const allPosts = getAllPosts();
  const posts = allPosts.filter((post) => post.metaData.author === name);
  return { member, posts };
};

type Params = {
  name: string;
};

const MemberPage = ({ params: { name } }: { params: Params }) => {
  const { member, posts } = getData({ name });

  return (
    <div className={styles.layout}>
      <MemberDetail member={member} />
      <div className={styles.posts}>
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default MemberPage;
