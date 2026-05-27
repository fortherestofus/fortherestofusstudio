import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server-mode build (so `next start` works on Hostinger / @netlify/next).
  // Add `output: "export"` here only if you want pure static files in /out instead.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
