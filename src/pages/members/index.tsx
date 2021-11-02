import { Layout } from "../../components/Layout";
import { PageLayout } from "../../components/PageLayout";
import styles from "./members.module.css";
import { activeMembers, Member } from "../../utils/members";
import Link from "next/link";
import { MemberIcon } from "../../components/MemberIcon";

const MemberItem = ({ member }: { member: Member }) => {
  return (
    <li className={styles.member}>
      <MemberIcon name={member.name} width="100" height="100" />
      <div className={styles.details}>
        <p className={styles.name}>
          <Link href={`/members/${member.name}`}>{member.name}</Link>
        </p>
        <div className={styles.links}>
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
      <ul className={styles.members}>
        {activeMembers.map((member) => {
          return <MemberItem key={member.name} member={member} />;
        })}
      </ul>
    </PageLayout>
  </Layout>
);

export default Members;
