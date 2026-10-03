import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The site has two root layouts (main site and /batcomputer), so unmatched
    // URLs need app/global-not-found.tsx to render a styled 404.
    globalNotFound: true,
  },
};

export default nextConfig;
