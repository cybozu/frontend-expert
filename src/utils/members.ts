export type Member = {
  name: string;
  twitterId: string;
  githubUsername: string;
  active: boolean;
};

export const members: Member[] = [
  {
    name: "koba04",
    twitterId: "koba04",
    githubUsername: "koba04",
    active: true,
  },
  {
    name: "pirosikick",
    twitterId: "pirosikick",
    githubUsername: "pirosikick",
    active: true,
  },
  {
    name: "zaki___yama",
    twitterId: "zaki___yama",
    githubUsername: "zaki-yama",
    active: true,
  },
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
    name: "toshi__toma",
    twitterId: "toshi__toma",
    githubUsername: "toshi-toma",
    active: false,
  },
  {
    name: "mugi",
    twitterId: "mugi_uno",
    githubUsername: "mugi-uno",
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

function isGuest(name: string): boolean {
  return members.every((member) => member.name !== name);
}

export function getIconByName(name: string) {
  return isGuest(name)
    ? `/guest-icons/${name}.jpg`
    : `/member-icons/${name}.jpg`;
}
