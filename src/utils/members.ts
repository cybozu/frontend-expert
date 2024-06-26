export type Member = {
  name: string;
  twitterId: string;
  githubUsername: string;
  zennUsername?: string;
  active: boolean;
};

export const members: Member[] = [
  {
    name: "BaHo",
    twitterId: "b4h0_c4t",
    githubUsername: "b4h0-c4t",
    zennUsername: "b4h0_c4t",
    active: true,
  },
  {
    name: "sosukesuzuki",
    twitterId: "__sosukesuzuki",
    githubUsername: "sosukesuzuki",
    zennUsername: "sosukesuzuki",
    active: true,
  },
  {
    name: "mugi",
    twitterId: "mugi_uno",
    githubUsername: "mugi-uno",
    zennUsername: "mugi",
    active: true,
  },
  {
    name: "Saji",
    twitterId: "sajikix",
    githubUsername: "sajikix",
    zennUsername: "sajikix",
    active: true,
  },
  {
    name: "nus3",
    twitterId: "nus3_",
    githubUsername: "nus3",
    zennUsername: "nus3",
    active: true,
  },
  {
    name: "nakajmg",
    twitterId: "nakajmg",
    githubUsername: "nakajmg",
    zennUsername: "nakajmg",
    active: false,
  },
  {
    name: "sakito",
    twitterId: "__sakito__",
    githubUsername: "sakito21",
    active: false,
  },
  {
    name: "shisama",
    twitterId: "shisama_",
    githubUsername: "shisama",
    active: false,
  },
];

export const zennMemberMap = members
  .filter(
    (member): member is Member & { zennUsername: string } =>
      !!member.zennUsername
  )
  .reduce((prev, member) => {
    prev[member.zennUsername] = member;
    return prev;
  }, {} as Record<string, Member>);

export const activeMembers: Member[] = members.filter(
  (member) => member.active
);

export function getMemberByName(name: string): Member {
  const foundMember = members.find((member) => member.name === name);
  if (foundMember === undefined) {
    throw new Error(`Invalid member name ${name}`);
  }
  return foundMember;
}

export function getMembersByName(name: string | string[]): Member[] {
  if (!Array.isArray(name)) {
    return [getMemberByName(name)];
  }

  const foundMembers = name.map((n) => {
    return getMemberByName(n);
  });
  return foundMembers;
}

function isGuest(name: string): boolean {
  return members.every((member) => member.name !== name);
}

export function getIconByName(name: string) {
  return isGuest(name)
    ? `/guest-icons/${name.toLowerCase()}.jpg`
    : `/member-icons/${name.toLowerCase()}.jpg`;
}
