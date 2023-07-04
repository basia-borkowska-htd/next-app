/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['nextappzepp.s3.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/users',
      },
    ]
  },
}

module.exports = nextConfig
