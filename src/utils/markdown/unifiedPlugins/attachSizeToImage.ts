import path from "node:path";
import type { Plugin } from "unified";
import type { Node, Parent } from "unist";
import type { Image } from "mdast";
import { visit } from "unist-util-visit";
import sizeOf from "image-size";

const IMAGES_DIR_PATH = path.join(process.cwd(), "public", "image");

type Size = {
  height: number;
  width: number;
};

/**
 * width が大きすぎたときに、比率を維持して width を小さくする
 */
function fitToMaxWidth(size: Size): Size {
  const widthThreshold = 960 * 0.8;
  if (size.width < widthThreshold) {
    return size;
  }
  const width = widthThreshold - 50;
  const ratio = width / size.width;
  const height = size.height * ratio;
  return { width, height };
}

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
        const size = sizeOf(imageFilePath);
        if (size.height == null || size.width == null) {
          return;
        }
        const { width, height } = fitToMaxWidth({
          width: size.width,
          height: size.height,
        });
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
