import { faGithubAlt, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Member } from "../utils/members";
import styles from "./css/MemberDetail.module.css";
import { MemberIcon } from "./MemberIcon";

export const MemberDetail = ({ member }: { member: Member }) => {
  return (
    <div className={styles.page}>
      <div className={styles.memberIcon}>
        <MemberIcon name={member.name} width={160} height={160} />
      </div>
      <h2 className={styles.memberName}>{`${member.name}${
        member.active ? "" : "(inactive)"
      }`}</h2>
      <ul className={styles.links}>
        <li>
          <FontAwesomeIcon icon={faTwitter} width="24" height="24" />
          <a href={`https://twitter.com/${member.twitterId}`}>
            @{member.twitterId}
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faGithubAlt} width="24" height="24" />
          <a href={`https://github.com/${member.githubUsername}`}>
            @{member.githubUsername}
          </a>
        </li>
      </ul>
    </div>
  );
};
