import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ["i.redd.it", "preview.redd.it", "external-preview.redd.it"],
  },
};

export default nextConfig;
