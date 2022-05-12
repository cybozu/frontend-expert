import { css } from "@emotion/react";
import Link from "next/link";
import { PostData } from "../utils/posts";
import { MemberIcon } from "./MemberIcon";

type Props = {
  posts: PostData[];
};
export const Posts = ({ posts }: Props) => {
  return (
    <div css={style}>
      {posts.map(({ slug, metaData }) => {
        return (
          <div key={slug} className="item">
            <Link href={`/posts/${slug}`} passHref>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <div className="title">{metaData.title}</div>

                <div className="author">
                  <MemberIcon width="30" height="30" name={metaData.author} />
                  <span className="date">{metaData.createdAt}</span>
                </div>
                <div className="tags">
                  {metaData.tags.map((tag, index) => {
                    return (
                      <span className="tag" key={index}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const style = css`
  .item {
    font-size: 1.1rem;
    padding: 12px 4px 8px;
  }
  .item + .item {
    margin-top: 8px;
    border-top: 1px solid #ebebeb;
  }
  .title {
    font-size: 1.2em;
  }
  .tags {
    margin-top: 12px;
    display: flex;
    align-items: center;
    grid-gap: 8px;
  }
  .tag {
    font-size: 0.5em;
    border: 1px solid;
    padding: 2px 4px;
    border-radius: 2px;
    color: currentColor;
  }
  .date {
    font-size: 0.8em;
  }
  .author {
    display: flex;
    align-items: center;
    grid-gap: 8px;
    padding-top: 8px;
    img {
      border-radius: 4px;
    }
  }
`;
