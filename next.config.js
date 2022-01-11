const createServer = require("./server.js");

const server = createServer();
server.listen(8888);

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
