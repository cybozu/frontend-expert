import Image from "next/image";
import { getIconByName } from "../utils/members";
import { unoptimizeLoader } from "../utils/unoptimizeLoader";

type Props = {
  width: string;
  height: string;
  name: string;
};

export const MemberIcon = ({ width, height, name }: Props) => {
  return (
    <Image
      src={getIconByName(name)}
      alt={`${name} icon`}
      width={width}
      height={height}
      layout="fixed"
      loader={unoptimizeLoader}
    />
  );
};
