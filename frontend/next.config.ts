import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: [
      "localhost",
      "via.placeholder.com",
      "lh3.googleusercontent.com",
      "graph.facebook.com",
      "images.unsplash.com",
      "ui-avatars.com",
    ],
  },
};

export default nextConfig;
