import { withNextVideo } from 'next-video/process';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
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
  return {
    ...nextConfig,
    ...withNextVideo(nextConfig),
    ...withNextIntl(nextConfig),
  };
  }
