/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/users',
      },
    ]
  },
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
