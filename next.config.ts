import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com/**",
      },
    ],
  }
  // eslint: {
  //   // ESLint errors will not fail the build
  //   ignoreDuringBuilds: true,
  // },
  // if used turbopack
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
