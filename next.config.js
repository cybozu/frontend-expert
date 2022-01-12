if (process.env.NODE_ENV === "development") {
  require("./server.js")().listen(8888);
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "custom",
  },
  basePath: "/frontend-expert",
  assetPrefix: "/frontend-expert",
  swcMinify: true,
};

module.exports = nextConfig;
