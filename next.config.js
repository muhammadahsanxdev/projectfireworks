/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.dmcdn.net',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig; 