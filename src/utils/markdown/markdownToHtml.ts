import remark from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { hatenaLinkCard } from "./unifiedPlugins/hatenaLinkCard";
import { attachSizeToImage } from "./unifiedPlugins/attachSizeToImage";

export async function markdownToHtml(markdownContent: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(hatenaLinkCard)
    .use(attachSizeToImage)
    .use(html, { sanitize: false })
    .process(markdownContent);
  return result.toString();
}
