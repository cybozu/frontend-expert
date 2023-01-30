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
  experimental: {
    appDir: true,
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/frontend-expert",
        permanent: true,
        basePath: false,
      },
      {
        source: "/members",
        destination: "/frontend-expert/members",
        permanent: true,
        basePath: false,
      },
      {
        source: "/posts",
        destination: "/frontend-expert/posts",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
