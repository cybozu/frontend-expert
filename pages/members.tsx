import Layout from "../components/Layout";

type Member = {
  name: string;
  twitterId?: string;
  githubUsername?: string;
};

const members: Member[] = [
  {
    name: "sosukesuzuki",
    twitterId: "__sosukesuzuki",
    githubUsername: "sosukesuzuki",
  },
  {
    name: "BaHo",
    twitterId: "b4h0_c4t",
    githubUsername: "b4h0-c4t",
  },
  {
    name: "sakito",
    twitterId: "__sakito__",
    githubUsername: "sakito21",
  },
];

const Member = ({ member }: { member: Member }) => {
  return (
    <section>
      <p>{member.name}</p>
      <a
        href={`https://twitter.com/${member.twitterId}`}
      >{`@${member.twitterId}`}</a>
      <a
        href={`https://github.com/${member.githubUsername}`}
      >{`@${member.githubUsername}`}</a>
    </section>
  );
};

const Members = () => (
  <Layout title="メンバー一覧">
    {members.map((member) => {
      return <Member key={member.name} member={member} />;
    })}
  </Layout>
);

export default Members;
