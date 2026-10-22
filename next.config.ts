import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones/tablets on the same Wi-Fi load the dev server (e.g. http://192.168.0.108:3000).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};

export default nextConfig;
