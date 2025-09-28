import type { NextConfig } from "next";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aggregator.walrus-testnet.walrus.space',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
export default nextConfig;
