import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  turbopack: {
    root: path.resolve("."),
  },
};

export default nextConfig;