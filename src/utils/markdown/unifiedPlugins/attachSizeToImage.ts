import path from "node:path";
import type { Plugin } from "unified";
import type { Node, Parent } from "unist";
import type { Image } from "mdast";
import { visit } from "unist-util-visit";
import sizeOf from "image-size";

const IMAGES_DIR_PATH = path.join(process.cwd(), "public", "image");

export const attachSizeToImage: Plugin = () => {
  return (tree: Node) => {
    visit(tree, "image", (node: Image, index: number, parent: Parent): void => {
      if (!node.url.startsWith("/frontend-expert/image/")) {
        return;
      }
      const imageFilePath = path.join(
        IMAGES_DIR_PATH,
        node.url.replace("/frontend-expert/image/", "")
      );
      try {
        const { height, width } = sizeOf(imageFilePath);
        if (height == null || width == null) {
          return;
        }
        const newNode = {
          type: "html",
          value: `<img src="${node.url}" alt="${node.alt}" width="${width}" height="${height}" >`,
        };
        parent.children[index] = newNode;
      } catch {
        // do nothing
      }
    });
  };
};
