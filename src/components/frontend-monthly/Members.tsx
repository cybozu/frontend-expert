import { FC } from "react";
import { MemberIcon } from "../MemberIcon";
import styles from "./Members.module.css";

interface Props {
  members: Array<{ name: string; link?: string }>;
}
export const Members: FC<Props> = ({ members }) => {
  return (
    <div className={styles.members}>
      {members.map(({ name, link }) => {
        return (
          <div key={name} className={styles.member}>
            <MemberIcon width="100" height="100" name={name} />
            {link ? <a href={link}>{name}</a> : <span>{name}</span>}
          </div>
        );
      })}
    </div>
  );
};
