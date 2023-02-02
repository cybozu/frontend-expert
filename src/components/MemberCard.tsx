import { Member } from "../app/members/members";
import Link from "next/link";
import { MemberIcon } from "./MemberIcon";
import { faGithubAlt, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./css/MemberCard.module.css";

export const MemberCard = ({ member }: { member: Member }) => {
  return (
    <li className={styles.member}>
      <MemberIcon name={member.name} width={100} height={100} />
      <div className={styles.details}>
        <p className={styles.name}>
          <Link href={`/members/${member.name}`}>{member.name}</Link>
          {!member.active ? (
            <span className={styles.inactive}>(inactive)</span>
          ) : (
            ""
          )}
        </p>
        <div className={styles.links}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faTwitter} width="18" height="18" />{" "}
              <a
                href={`https://twitter.com/${member.twitterId}`}
                target="_blank"
                rel="noreferrer noopener"
              >{`@${member.twitterId}`}</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faGithubAlt} width="18" height="18" />{" "}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://github.com/${member.githubUsername}`}
              >{`@${member.githubUsername}`}</a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};
