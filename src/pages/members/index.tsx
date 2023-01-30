import { Layout } from "../../components/Layout";
import { PageLayout } from "../../components/PageLayout";
import { members, Member } from "../../utils/members";
import Link from "next/link";
import { MemberIcon } from "../../components/MemberIcon";
import { faGithubAlt, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../components/css/MembersPage.module.css";

const MemberItem = ({ member }: { member: Member }) => {
  return (
    <li className={styles.member}>
      <MemberIcon name={member.name} width={100} height={100} />
      <div className={styles.details}>
        <p className={styles.name}>
          <Link href={`/members/${member.name}`}>{member.name}</Link>
          {!member.active ? (
            <span className={styles.inactive}>(inactive)</span>
          ) : (
            ""
          )}
        </p>
        <div className={styles.links}>
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
      <ul className={styles.members}>
        {members.map((member) => {
          return <MemberItem key={member.name} member={member} />;
        })}
      </ul>
    </PageLayout>
  </Layout>
);

export default Members;
