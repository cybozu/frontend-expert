import { Layout } from "../../components/Layout";
import { PageLayout } from "../../components/PageLayout";
import { activeMembers, Member } from "../../utils/members";
import Link from "next/link";
import { MemberIcon } from "../../components/MemberIcon";
import { css } from "@emotion/css";

const MemberItem = ({ member }: { member: Member }) => {
  return (
    <li className={memberStyle}>
      <MemberIcon name={member.name} width="100" height="100" />
      <div className="details">
        <p className="name">
          <Link href={`/members/${member.name}`}>{member.name}</Link>
        </p>
        <div className="links">
          <ul>
            <li>
              Twitter:{" "}
              <a
                href={`https://twitter.com/${member.twitterId}`}
                target="_blank"
                rel="noreferrer noopener"
              >{`@${member.twitterId}`}</a>
            </li>
            <li>
              GitHub:{" "}
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
      <ul className={membersStyle}>
        {activeMembers.map((member) => {
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
    font-size: 0.8rem;
  }
`;

export default Members;
