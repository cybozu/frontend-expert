import { ZennPostData } from "../../types";
import { zennMemberMap } from "../members/members";
export const getZennPosts = () => {
  return getZennData()
    .articles.filter((article) => !!zennMemberMap[article.user.username])
    .map(
      (article): ZennPostData => ({
        type: "zenn",
        slug: `__zenn-${article.slug}`,
        href: `https://zenn.dev${article.path}`,
        metaData: {
          title: `${article.emoji} ${article.title}`,
          author: zennMemberMap[article.user.username].name,
          createdAt: formatZennDate(article.published_at),
          tags: ["zenn"],
        },
      })
    );
};

import data from "../../../data/zenn/articles.json";
import { ZennArticles } from "./schema";

export const getZennData = () => {
  return data as ZennArticles;
};

const formatZennDate = (dateString: string) => {
  const localeString = new Date(dateString).toLocaleDateString("ja-JP");
  const [y, m, d] = localeString.split("/");
  return `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
};
