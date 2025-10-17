import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/**')],
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          }
        ],
      },
    ]
  }
};

export default nextConfig;
