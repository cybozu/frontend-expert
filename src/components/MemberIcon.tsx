import Image from "next/image";
import { getIconByName } from "../utils/members";

type Props = {
  width: string;
  height: string;
  name: string;
};

export const MemberIcon = ({ width, height, name }: Props) => {
  return (
    <Image
      src={`/frontend-expert/${getIconByName(name)}`}
      alt={`${name}`}
      width={width}
      height={height}
      layout="fixed"
      unoptimized
    />
  );
};
