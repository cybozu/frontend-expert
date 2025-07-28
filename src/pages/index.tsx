import { css } from "@emotion/css";
import Image from "next/image";
import { Layout } from "../components/Layout";
import { PageLayout } from "../components/PageLayout";

const IndexPage = () => (
  <Layout>
    <PageLayout>
      <aside
        className={bannerStyle}
        role="banner"
        aria-labelledby="migration-notice"
      >
        <div className={bannerContentStyle}>
          <span className={bannerIconStyle} role="img" aria-label="お知らせ">
            📢
          </span>
          <section className={bannerTextStyle}>
            <h2 id="migration-notice" className={bannerTitleStyle}>
              移行のお知らせ
            </h2>
            <p className={bannerDescriptionStyle}>
              サイボウズのフロントエンドに関する取組は、
              <a
                href="https://zenn.dev/p/cybozu_frontend"
                target="_blank"
                rel="noreferrer"
                className={bannerLinkStyle}
              >
                ZennのPublication
              </a>
              にて発信しています。
              <br />
              今後はこちらをご覧ください！
            </p>
          </section>
        </div>
      </aside>

      <h2>Hello Cybozu Frontend Expert Team 👋</h2>
      <a
        href="https://speakerdeck.com/cybozuinsideout/frontendexpert-team"
        target="_blank"
        rel="noreferrer"
        className={thubnmailStyle}
      >
        <Image
          unoptimized
          src="/frontend-expert/speakerdeck-thumbnail.png"
          alt="フロントエンドエキスパートチームについて"
          width="1200"
          height="889"
        />
      </a>
      <a
        className={linkStyle}
        href="https://speakerdeck.com/cybozuinsideout/frontendexpert-team"
        target="_blank"
        aria-hidden="true"
        rel="noreferrer"
      >
        https://speakerdeck.com/cybozuinsideout/frontendexpert-team
      </a>
    </PageLayout>
  </Layout>
);

const thubnmailStyle = css`
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  display: block;
`;

const linkStyle = css`
  margin-top: 8px;
  display: block;
  text-align: right;
  font-size: 0.8em;
`;

const bannerStyle = css`
  width: 100%;
  background: linear-gradient(135deg, #e8f4f8 0%, #f5f7fa 100%);
  border: 2px solid #3182ce;
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(49, 130, 206, 0.1);
  overflow: hidden;
`;

const bannerContentStyle = css`
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  color: #2d3748;
`;

const bannerIconStyle = css`
  font-size: 2rem;
  background: #3182ce;
  color: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const bannerTextStyle = css`
  flex: 1;
`;

const bannerTitleStyle = css`
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
`;

const bannerDescriptionStyle = css`
  margin: 0;
  line-height: 1.6;
  color: #4a5568;
`;

const bannerLinkStyle = css`
  color: #2b6cb0;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    color: #2c5282;
    border-bottom-color: #2c5282;
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #3182ce;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export default IndexPage;
