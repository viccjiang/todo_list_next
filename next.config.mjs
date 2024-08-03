/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  basePath: isProd ? "/todo_list_next" : "",
  assetPrefix: isProd ? "/todo_list_next/" : "",
  output: "export",
};

export default nextConfig;
