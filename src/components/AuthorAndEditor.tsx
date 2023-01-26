import { css } from "@emotion/react";
import { faGithubAlt, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Member } from "../utils/members";
import { MemberIcon } from "./MemberIcon";

const Author = ({ author, label }: { author: Member; label?: string }) => {
  return (
    <div css={authorStyle}>
      <Link href={`/members/${author.name}`} className="memberIcon" passHref>
        <MemberIcon width="60" height="60" name={author.name} />
      </Link>
      <div className="authorInfo">
        <div className="label">{label ? label : "Author"}</div>
        <span className="authorName">
          <Link href={`/members/${author.name}`}>{author.name}</Link>
        </span>
        <ul>
          <li>
            <a
              href={`https://twitter.com/${author.twitterId}`}
              aria-label="twitter"
              className="icon"
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
              className="icon"
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

const authorStyle = css`
  display: flex;
  height: 60px;
  color: #333;
  .label {
    width: 100%;
    font-size: 0.6rem;
    font-weight: bold;
  }
  .memberIcon {
    img {
      border-radius: 4px;
    }
  }

  a {
    color: inherit;
  }

  .icon {
    display: block;
    svg {
      color: #444;
      width: 18px;
      height: 18px;
      font-size: 1rem;
    }
  }

  .authorName {
    font-size: 0.9rem;
    line-height: 1;
    margin-top: 4px;
  }

  .authorInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 0.6rem;
    font-size: 1rem;
    flex-grow: 1;
  }

  .authorInfo ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 4px;
  }

  .authorInfo ul li:not(:last-of-type) {
    margin-right: 8px;
  }
`;

type Props = {
  author: Member;
  editors?: Member[];
};

export const AuthorAndEditor = ({ author, editors }: Props) => {
  return (
    <div css={authorsStyle}>
      <div className="author">
        <Author author={author} />
      </div>
      {editors && (
        <div className="editors">
          {editors.map((editor) => (
            <Author key={editor.name} author={editor} label="Editor" />
          ))}
        </div>
      )}
    </div>
  );
};

const authorsStyle = css`
  display: flex;
  margin: 1.5rem 0;
  .editors {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .author + .editors {
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #d3d3d3;
  }
`;
