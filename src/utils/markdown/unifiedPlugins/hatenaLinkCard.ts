import { Plugin } from "unified";
import { Node, Parent } from "unist";
import { visit } from "unist-util-visit";

const h = (type: string, attrs: any = {}, children: any[] = []) => {
  return {
    type: "element",
    tagName: type,
    data: {
      hName: type,
      hProperties: attrs,
      hChildren: children,
    },
    properties: attrs,
    children,
  };
};

export const hatenaLinkCard: Plugin = () => {
  return (tree: Node) => {
    visit(tree, "link", (node: Node, index: number, parent: Parent) => {
      if (parent.children.length > 1) return;
      if (!/.*:embed$/.test(node.url as string)) return;

      const url = (node.url as string).replace(/:embed$/, "");
      node.children = [
        h("div", { className: "hatena-link" }, [
          h("iframe", {
            className: "hatena-link-frame",
            src: `https://hatenablog-parts.com/embed?url=${url}`,
            style: "border: none;",
          }),
        ]),
      ];
      parent.children.splice(index, 1, ...(node.children as any[]));
    });
  };
};
