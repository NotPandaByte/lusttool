import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from your own domain and common external sources
    domains: ['localhost'],
    // Allow images from any source (for development - be more restrictive in production)
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow any HTTPS domain (you can restrict this in production)
      },
    ],
    // Enable static image optimization
    unoptimized: false,
  },
  // Ensure static files are properly served
  async headers() {
    return [
      {
        source: '/staff-images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/staff-models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
