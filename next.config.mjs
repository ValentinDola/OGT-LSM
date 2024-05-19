import { withNextVideo } from 'next-video/process';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      }
    ]
  }
};

export default async function config() {
    return withNextVideo(nextConfig);
  }
