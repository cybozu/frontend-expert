const remark = require("remark");
const html = require("remark-html");
const prism = require("remark-prism");
const gfm = require("remark-gfm");
const matter = require("gray-matter");

// import { hatenaLinkCard } from "./unifiedPlugins/hatenaLinkCard";
// import { attachSizeToImage } from "./unifiedPlugins/attachSizeToImage";

async function markdownToHtml(markdownContent) {
  const { content } = matter(markdownContent);
  const result = await remark()
    .use(gfm)
    // .use(hatenaLinkCard)
    // .use(attachSizeToImage)
    .use(html)
    .use(prism)
    .process(content);
  return result.toString();
}

module.exports = markdownToHtml;
