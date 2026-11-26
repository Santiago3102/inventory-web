import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: path.resolve(".") },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;