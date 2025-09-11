import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/detect-disease',
        destination: 'http://128.199.30.51:9000/detect-disease',
      },
    ];
  },
};

export default nextConfig;
