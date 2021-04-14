import Image from "next/image";
import { Layout } from "../components/Layout";
import styles from "./members.module.css";
import { Member, members, getIconByName } from "../utils/members";

const Member = ({ member }: { member: Member }) => {
  return (
    <section className={styles.member}>
      <Image
        src={getIconByName(member.name)}
        alt={`${member.name} icon`}
        width="100"
        height="100"
      />
      <div className={styles.details}>
        <p className={styles.name}>{member.name}</p>
        <div className={styles.links}>
          <ul>
            <li>
              Twitter:{" "}
              <a
                href={`https://twitter.com/${member.twitterId}`}
              >{`@${member.twitterId}`}</a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href={`https://github.com/${member.githubUsername}`}
              >{`@${member.githubUsername}`}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

const Members = () => (
  <Layout title="Members">
    <h2>Members</h2>
    {members.map((member) => {
      return <Member key={member.name} member={member} />;
    })}
  </Layout>
);

export default Members;
