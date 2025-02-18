import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  /*assetPrefix: process.env.ENV === 'local' ? '' : "https://assets.trilink.dev"*/
  assetPrefix: process.env.ENV === 'local' ? '' : "http://localhost"
};

export default nextConfig;
