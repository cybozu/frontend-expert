import type { ImageLoader } from "next/image";

export const unoptimizeLoader: ImageLoader = ({ src }) => src;
