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
      // Product images stored on the Medusa server itself (local file storage, served at /static).
      ...backendImageHost(),
      {
        // Product images uploaded through Medusa to Oracle Object Storage.
        protocol: "https",
        hostname: "**.oraclecloud.com",
      },
    ],
  },
};

export default nextConfig;

/** Allows next/image to load files from the Medusa backend's own host (e.g. https://api.vistaaram.in/static/...). */
function backendImageHost(): { protocol: "https"; hostname: string }[] {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "");
    return url.protocol === "https:" ? [{ protocol: "https", hostname: url.hostname }] : [];
  } catch {
    return [];
  }
}
