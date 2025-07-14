import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Production-ready image configuration
    domains: [], // Remove localhost - will be set by environment
    // Allow images from any HTTPS source (you can restrict this further in production)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any HTTPS domain
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

    ];
  },
  // Production optimizations
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
};

export default nextConfig;
