/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin-dashboard-534534534.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'img-c.udemycdn.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
