import { VFC } from "react";
import Link from "next/link";
import Image from "next/image";
import { css } from "@emotion/react";

export const Header: VFC = () => {
  return (
    <header css={style}>
      <div className="content">
        <h1>
          <Link href="/" passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <Image
                alt="Frontend Expert Team Logo"
                width="200"
                height="78"
                src="/frontend-expert/logo.png"
                unoptimized
              />
            </a>
          </Link>
        </h1>
        <nav className="navigation">
          <ul>
            <li>
              <Link href="/members">Members</Link>
            </li>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <a
                href="https://cybozu.co.jp/company/job/recruitment/list/front_end_expert.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Recruiting
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const style = css`
  padding: 1.2rem 0 1rem;
  background-color: var(--primary-color);

  .content {
    max-width: var(--content-width);
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  h1 {
    font-size: 1.6rem;
  }

  .navigation ul {
    margin: 0;
    list-style: none;
    display: flex;
  }

  .navigation ul li {
    padding: 0.2rem 0;
    font-size: 1rem;
  }

  .navigation ul li:not(:last-child)::after {
    content: "/";
    margin: 0 0.4rem;
    color: var(--light-font-color);
  }

  a {
    color: var(--light-font-color);
  }
`;
