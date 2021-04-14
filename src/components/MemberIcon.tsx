import Image from "next/image";
import { getIconByName, Member } from "../utils/members";

type Props = {
  width: string;
  height: string;
  member: Member;
};

export const MemberIcon = ({ width, height, member }: Props) => {
  return (
    <Image
      src={getIconByName(member.name)}
      alt={`${member.name} icon`}
      width={width}
      height={height}
    />
  );
};
