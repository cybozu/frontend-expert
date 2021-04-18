import { FC } from "react";
import { getMemberByName } from "../../utils/members";
import { Description } from "./Description";
import { Members } from "./Members";
import { StreamView } from "./StreamView";
import styles from "./EventSummary.module.css";

type Props = {
  date: string;
  connpassUrl: string;
  streamUrl: string;
  memberNames: string[];
  guests?: Array<{ name: string; link?: string }>;
};

export const EventSummary: FC<Props> = ({
  date,
  connpassUrl,
  streamUrl,
  memberNames,
  guests,
}) => {
  const members = memberNames.map((name) => {
    const { twitterId } = getMemberByName(name);
    return {
      name,
      link: `https://twitter.com/${twitterId}`,
    };
  });
  return (
    <div className={styles.eventSummary}>
      <Description />

      <h2>開催日</h2>
      <p>{date}</p>

      <h2>イベントページ</h2>
      <a href={connpassUrl}>{connpassUrl}</a>

      <h2>配信URL</h2>
      <StreamView streamUrl={streamUrl} />

      <h2>メンバー</h2>
      <Members members={members} />

      {guests && (
        <>
          <h2>ゲスト</h2>
          <Members members={guests} />
        </>
      )}
    </div>
  );
};
