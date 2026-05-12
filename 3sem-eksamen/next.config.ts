import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "night-club-api-2026-main.onrender.com",
      },
    ],
  },
};

export default nextConfig;
