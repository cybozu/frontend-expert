/** @jsxImportSource @emotion/react */
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Layout } from "../../components/Layout";
import { getMemberByName, Member, members } from "../../utils/members";
import { getPostsByAuthor, PostData } from "../../utils/posts";
import { Posts } from "../../components/Posts";
import { MemberIcon } from "../../components/MemberIcon";
import { css } from "@emotion/react";

const MemberSection = ({ member }: { member: Member }) => {
  return (
    <div css={style}>
      <MemberIcon name={member.name} width="200" height="200" />
      <h1 className="memberName">{`${member.name}${
        member.active ? "" : "(inactive)"
      }`}</h1>
      <ul className="links">
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
      <div className="posts">
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

const style = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .memberName {
    font-size: 3rem;
  }

  .links {
    list-style: none;
    display: flex;
  }

  .links li {
    font-size: 1.4rem;
    margin-right: 1.2rem;
  }

  .posts {
    margin-top: 1.2rem;
  }
`;
