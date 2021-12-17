import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";
import gfm from "remark-gfm";
import { hatenaLinkCard } from "./unifiedPlugins/hatenaLinkCard";
import { attachSizeToImage } from "./unifiedPlugins/attachSizeToImage";

export async function markdownToHtml(markdownContent: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(hatenaLinkCard)
    .use(attachSizeToImage)
    .use(html)
    .use(prism)
    .process(markdownContent);
  return result.toString();
}
