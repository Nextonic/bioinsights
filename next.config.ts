import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // For static export to S3 (optional):
  // output: "export",
};


export default { output: "export" } as const;
