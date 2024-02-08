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
      {
        source: '/api/detect-text',
        destination: 'http://localhost:3001/detect-text',
        permanent: true,
      },
      {
        source: '/api/voice',
        destination: `http://127.0.0.1:8000/voice/`,
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
