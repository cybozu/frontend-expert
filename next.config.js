/* global __dirname */
const path = require("node:path");
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
    esmExternals: "loose",
  },
  webpack: function (config, { isServer }) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    config.externals = { canvas: {} };
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          net: false,
          dns: false,
          tls: false,
          assert: false,
          path: false,
          fs: false,
          events: false,
          process: false,
          child_process: false,
        },
      };
    }
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
        source: "/members/:name",
        destination: "/frontend-expert/members/:name",
        permanent: true,
        basePath: false,
      },
      {
        source: "/posts",
        destination: "/frontend-expert/posts",
        permanent: true,
        basePath: false,
      },
      {
        source: "/posts/page/:pageNum",
        destination: "/frontend-expert/posts/page/:pageNum",
        permanent: true,
        basePath: false,
      },
      {
        source: "/posts/:slug",
        destination: "/frontend-expert/posts/:slug",
        permanent: true,
        basePath: false,
      },
      {
        source: "/tags/:tag",
        destination: "/frontend-expert/tags/:tag",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
