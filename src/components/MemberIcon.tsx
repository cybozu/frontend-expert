// import Image from "next/image";
import { getIconByName } from "../utils/members";

type Props = {
  width: string;
  height: string;
  name: string;
};

export const MemberIcon = ({ width, height, name }: Props) => {
  return (
    <img
      src={getIconByName(name)}
      alt={`${name} icon`}
      width={width}
      height={height}
      // layout="fixed"
    />
  );
};
