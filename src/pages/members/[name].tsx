import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Layout } from "../../components/Layout";
import { getMemberByName, Member, members } from "../../utils/members";
import { getPostsByAuthor, PostData } from "../../utils/posts";
import { Posts } from "../../components/Posts";
import { MemberIcon } from "../../components/MemberIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../../components/css/MemberPage.module.css";
const MemberSection = ({ member }: { member: Member }) => {
  return (
    <div className={styles.page}>
      <div className={styles.memberIcon}>
        <MemberIcon name={member.name} width={160} height={160} />
      </div>
      <h2 className={styles.memberName}>{`${member.name}${
        member.active ? "" : "(inactive)"
      }`}</h2>
      <ul className={styles.links}>
        <li>
          <FontAwesomeIcon icon={faTwitter} width="24" height="24" />
          <a href={`https://twitter.com/${member.twitterId}`}>
            @{member.twitterId}
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faGithubAlt} width="24" height="24" />
          <a href={`https://github.com/${member.githubUsername}`}>
            @{member.githubUsername}
          </a>
        </li>
      </ul>
    </div>
  );
};

const MemberPage = ({
  member,
  posts,
}: {
  member: Member;
  posts: PostData[];
}) => {
  return (
    <Layout title={member.name}>
      <div className={styles.layout}>
        <MemberSection member={member} />
        <div className={styles.posts}>
          <Posts posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

function assertContext(
  context: GetStaticPropsContext
): asserts context is { params: { name: string } } {
  if (!context.params) {
    throw new Error("'context.params' is undefined");
  }
  if (typeof context.params.name !== "string") {
    throw new Error("Unexpected 'name' is array, expected string.");
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  assertContext(context);
  const member = getMemberByName(context.params.name);
  const posts = await getPostsByAuthor(member.name);
  return {
    props: { member, posts },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: members.map((member) => ({
      params: {
        name: member.name,
      },
    })),
    fallback: false,
  };
};

export default MemberPage;
