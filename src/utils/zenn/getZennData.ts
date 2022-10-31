import data from "../../../data/zenn/articles.json";
import { ZennArticles } from "./schema";

export const getZennData = () => {
  return data as ZennArticles;
};
