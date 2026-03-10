import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "takethetools.com",
      },
    ],
  },
  experimental: {
    // optimizePackageImports: ["lucide-react"],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
