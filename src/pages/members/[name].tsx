import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Layout } from "../../components/Layout";
import {
  getIconByName,
  getMemberByName,
  Member,
  members,
} from "../../utils/members";
import { getPostsByAuthor, PostData } from "../../utils/posts";
import styles from "./member.module.css";
import Image from "next/image";
import { Posts } from "../../components/posts";

const MemberSection = ({ member }: { member: Member }) => {
  return (
    <div className={styles.member}>
      <Image
        width="200"
        height="200"
        src={getIconByName(member.name)}
        alt={`${member.name} icon`}
      />
      <h1 className={styles.memberName}>{member.name}</h1>
      <ul className={styles.links}>
        <li>
          <a href={`https://twitter.com/${member.twitterId}`}>Twitter</a>
        </li>
        <li>
          <a href={`https://github.com/${member.githubUsername}`}>GitHub</a>
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
      <MemberSection member={member} />
      <div className={styles.posts}>
        <Posts posts={posts} />
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
