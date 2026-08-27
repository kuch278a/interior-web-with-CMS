import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "/interior-web-with-CMS";

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: "export",
    basePath: repoName,
    assetPrefix: repoName,
  }),
  images: {
    unoptimized: isGithubPages ? true : false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
