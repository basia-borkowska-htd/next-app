/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['nextappzepp.s3.amazonaws.com'],
  },

  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
