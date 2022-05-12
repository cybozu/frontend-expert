import { Layout } from "../../components/Layout";
import { PageLayout } from "../../components/PageLayout";
import { members, Member } from "../../utils/members";
import Link from "next/link";
import { MemberIcon } from "../../components/MemberIcon";
import { css } from "@emotion/react";
import { faGithubAlt, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MemberItem = ({ member }: { member: Member }) => {
  return (
    <li css={memberStyle}>
      <MemberIcon name={member.name} width="100" height="100" />
      <div className="details">
        <p className="name">
          <Link href={`/members/${member.name}`}>{member.name}</Link>
          {!member.active ? <span className="inactive">(inactive)</span> : ""}
        </p>
        <div className="links">
          <ul>
            <li>
              <FontAwesomeIcon icon={faTwitter} width="18" height="18" />{" "}
              <a
                href={`https://twitter.com/${member.twitterId}`}
                target="_blank"
                rel="noreferrer noopener"
              >{`@${member.twitterId}`}</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faGithubAlt} width="18" height="18" />{" "}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://github.com/${member.githubUsername}`}
              >{`@${member.githubUsername}`}</a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};

const Members = () => (
  <Layout title="Members">
    <PageLayout>
      <h2>Members</h2>
      <ul css={membersStyle}>
        {members.map((member) => {
          return <MemberItem key={member.name} member={member} />;
        })}
      </ul>
    </PageLayout>
  </Layout>
);

const membersStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  margin: auto;
  max-width: 800px;

  @media (max-width: 600px) {
    max-width: 320px;
    margin: 0 auto;
  }
`;

const memberStyle = css`
  margin-bottom: 2.5rem;
  display: flex;

  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.2rem 0;
    padding-left: 1.2rem;
  }

  .details .name {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .details .links ul {
    list-style-type: none;
  }

  .details .links ul li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
  }
  .inactive {
    color: gray;
    font-size: 0.8rem;
    padding-left: 8px;
  }
`;

export default Members;
