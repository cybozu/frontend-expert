/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "custom",
  },
  basePath: "/frontend-expert",
  assetPrefix: "/frontend-expert",
  experimental: {
    swcLoader: true,
    swcMinify: true,
  },
};

module.exports = nextConfig;
