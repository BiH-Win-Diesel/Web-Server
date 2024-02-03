/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/detect-text',
        destination: 'http://localhost:3001/detect-text',
      },
    ]
  },
};

module.exports = nextConfig;
