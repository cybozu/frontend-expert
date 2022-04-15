import { css } from "@emotion/css";
import { loadDefaultJapaneseParser } from "budoux";

const parser = loadDefaultJapaneseParser();

export const PostTitle = ({ title }: { title: string }) => {
  return (
    <h2
      className={style}
      dangerouslySetInnerHTML={{
        __html: parser.translateHTMLString(title),
      }}
    />
  );
};

const style = css`
  margin-left: 0;
  margin-right: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  color: inherit;
  font-family: Montserrat, sans-serif;
  font-weight: 900;
  text-rendering: optimizeLegibility;
  font-size: 1.8rem;
  line-height: 1.5;
`;
