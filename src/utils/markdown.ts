import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";
import gfm from "remark-gfm";

export async function markdownToHtml(markdownContent: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(html)
    .use(prism)
    .process(markdownContent);
  return result.toString();
}
