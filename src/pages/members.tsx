import Image from "next/image";
import Layout from "../components/Layout";
import { SpeakerDeck } from "../components/SpeakerDeck";
import styles from "./members.module.css";

type Member = {
  name: string;
  twitterId?: string;
  githubUsername?: string;
};

const members: Member[] = [
  {
    name: "koba04",
    twitterId: "koba04",
    githubUsername: "koba04",
  },
  {
    name: "pirosikick",
    twitterId: "pirosikick",
    githubUsername: "pirosikick",
  },
  {
    name: "zaki___yama",
    twitterId: "zaki___yama",
    githubUsername: "zaki-yama",
  },
  {
    name: "sakito",
    twitterId: "__sakito__",
    githubUsername: "sakito21",
  },
  {
    name: "shisama",
    twitterId: "shisama_",
    githubUsername: "shisama",
  },
  {
    name: "nakajmg",
    twitterId: "nakajmg",
    githubUsername: "nakajmg",
  },
  {
    name: "BaHo",
    twitterId: "b4h0_c4t",
    githubUsername: "b4h0-c4t",
  },
  {
    name: "sosukesuzuki",
    twitterId: "__sosukesuzuki",
    githubUsername: "sosukesuzuki",
  },
];

const Member = ({ member }: { member: Member }) => {
  return (
    <section className={styles.member}>
      <Image
        src={`/member-icons/${member.name}.jpg`}
        alt={`${member.name} icon`}
        width="100"
        height="100"
      />
      <div className={styles.details}>
        <p className={styles.name}>{member.name}</p>
        <div className={styles.links}>
          <ul>
            <li>
              <a
                href={`https://twitter.com/${member.twitterId}`}
              >{`@${member.twitterId}`}</a>
            </li>
            <li>
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
    <SpeakerDeck
      embedId="0efec8a9dd224baebfb2aaf30fbe9a28"
      width="400px"
      title="フロントエンドエキスパートチームについて"
    />
  </Layout>
);

export default Members;
