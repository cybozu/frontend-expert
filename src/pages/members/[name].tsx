import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Layout } from "../../components/Layout";
import { getMemberByName, Member, members } from "../../utils/members";
import { getPostsByAuthor, PostData } from "../../utils/posts";
import { Posts } from "../../components/Posts";
import { MemberIcon } from "../../components/MemberIcon";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt, faTwitter } from "@fortawesome/free-brands-svg-icons";

const MemberSection = ({ member }: { member: Member }) => {
  return (
    <div css={style}>
      <div className="memberIcon">
        <MemberIcon name={member.name} width="160" height="160" />
      </div>
      <h2 className="memberName">{`${member.name}${
        member.active ? "" : "(inactive)"
      }`}</h2>
      <ul className="links">
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
      <div css={layoutStyle}>
        <MemberSection member={member} />
        <div css={postsStyle}>
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

const style = css`
  .memberIcon {
    img {
      border-radius: 4px;
    }
  }

  .memberName {
    font-size: 1.8rem;
    font-weight: normal;
  }

  .links {
    list-style: none;
    margin-top: 16px;
  }

  .links li {
    margin-right: 1.2rem;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const postsStyle = css`
  border-left: 1px solid #ebebeb;
  padding-left: 16px;
  @media (max-width: 600px) {
    border: none;
    padding-left: 0;
    margin-top: 16px;
    border-top: 1px solid #ebebeb;
  }
`;

const layoutStyle = css`
  padding: 8px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  @media (max-width: 600px) {
    display: block;
  }
`;
