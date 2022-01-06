export type Member = {
  name: string;
  twitterId: string;
  githubUsername: string;
  active: boolean;
};

export const members: Member[] = [
  {
    name: "sakito",
    twitterId: "__sakito__",
    githubUsername: "sakito21",
    active: true,
  },
  {
    name: "shisama",
    twitterId: "shisama_",
    githubUsername: "shisama",
    active: true,
  },
  {
    name: "nakajmg",
    twitterId: "nakajmg",
    githubUsername: "nakajmg",
    active: true,
  },
  {
    name: "BaHo",
    twitterId: "b4h0_c4t",
    githubUsername: "b4h0-c4t",
    active: true,
  },
  {
    name: "sosukesuzuki",
    twitterId: "__sosukesuzuki",
    githubUsername: "sosukesuzuki",
    active: true,
  },
  {
    name: "mugi",
    twitterId: "mugi_uno",
    githubUsername: "mugi-uno",
    active: true,
  },
  {
    name: "Saji",
    twitterId: "sajikix",
    githubUsername: "sajikix",
    active: true,
  },
  {
    name: "nus3",
    twitterId: "nus3_",
    githubUsername: "nus3",
    active: true,
  },
];

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
