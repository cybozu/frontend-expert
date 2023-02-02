import { faGithubAlt, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Member } from "../app/members/members";
import { MemberIcon } from "./MemberIcon";
import styles from "./css/AuthorAndEditor.module.css";

const Author = ({ author, label }: { author: Member; label?: string }) => {
  return (
    <div className={styles.authorAndEditor}>
      <Link
        href={`/members/${author.name}`}
        className={styles.memberIcon}
        passHref
      >
        <MemberIcon width={60} height={60} name={author.name} />
      </Link>
      <div className={styles.authorInfo}>
        <div className={styles.label}>{label ? label : "Author"}</div>
        <span className={styles.authorName}>
          <Link href={`/members/${author.name}`}>{author.name}</Link>
        </span>
        <ul>
          <li>
            <a
              href={`https://twitter.com/${author.twitterId}`}
              aria-label="twitter"
              className={styles.icon}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} width="18" height="18" />
            </a>
          </li>
          <li>
            <a
              href={`https://github.com/${author.githubUsername}`}
              aria-label="github"
              className={styles.icon}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithubAlt} width="18" height="18" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

type Props = {
  author: Member;
  editors?: Member[];
};

export const AuthorAndEditor = ({ author, editors }: Props) => {
  return (
    <div className={styles.authors}>
      <div className={styles.author}>
        <Author author={author} />
      </div>
      {editors && (
        <div className={styles.editors}>
          {editors.map((editor) => (
            <Author key={editor.name} author={editor} label="Editor" />
          ))}
        </div>
      )}
    </div>
  );
};
