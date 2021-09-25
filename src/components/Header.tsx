import { VFC } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { unoptimizeLoader } from "../utils/unoptimizeLoader";

export const Header: VFC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>
          <Link href="/" passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <Image
                alt="Frontend Expert Team Logo"
                width="200"
                height="78"
                src="/logo.png"
                loader={unoptimizeLoader}
              />
            </a>
          </Link>
        </h1>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link href="/members">Members</Link>
            </li>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
