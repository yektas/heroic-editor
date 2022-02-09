/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  basePath: isProd ? `/${process.env.NEXT_PUBLIC_BASE_PATH}` : "",
  assetPrefix: isProd ? `/${process.env.NEXT_PUBLIC_BASE_PATH}/` : "",
};

module.exports = nextConfig;
