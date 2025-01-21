import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
   images: {
     remotePatterns: [
      {
         // protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
    ],
  },
};

export default nextConfig;
