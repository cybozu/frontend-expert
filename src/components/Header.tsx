import Link from "next/link";
import Image from "next/legacy/image";
import styles from "./css/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>
          <Link href="/" passHref>
            <Image
              alt="Frontend Expert Team Logo"
              width="200"
              height="78"
              src="/frontend-expert/logo.png"
              unoptimized
            />
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
