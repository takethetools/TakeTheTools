import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
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
    turbopackUseSystemTlsCerts: true,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
