const nextConfig = {
  env:{
    lang : 'en'
  },
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
        destination: 'http://35.194.4.148:3001/detect-text',
        permanent: true,
      }
    ]
  },
};

module.exports = nextConfig;
