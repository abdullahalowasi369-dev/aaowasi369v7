import type { NextConfig } from "next";

/**
 * PORTABLE STATIC DEPLOYMENT
 * ==========================
 * `output: "export"` makes `next build` emit ordinary HTML/CSS/JS into `out/`.
 * No server runtime, Edge Function, Cloudflare adapter, middleware or API route is
 * required. This is the lowest-friction target for Cloudflare Pages, Vercel static
 * hosting and conventional static/CDN hosting.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // If next/image is added later, static export must not depend on an image server.
  images: { unoptimized: true },
};

export default nextConfig;
