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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/api/detect-text',
        destination: 'http://localhost:3001/detect-text',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
