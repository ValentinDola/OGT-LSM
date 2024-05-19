import { withNextVideo } from 'next-video/process';
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default async function config() {
    return withNextVideo(nextConfig);
  }
