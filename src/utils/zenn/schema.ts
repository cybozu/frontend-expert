import { z } from "zod";

export const Article = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  path: z.string(),
  emoji: z.string(),
  published_at: z.string(),
  user: z.object({
    username: z.string(),
  }),
});

export const Articles = z.object({
  articles: z.array(Article),
});

export type ZennArticle = z.infer<typeof Article>;

export type ZennArticles = z.infer<typeof Articles>;
