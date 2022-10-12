/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "f004.backblazeb2.com",
      "https://f004.backblazeb2.com"
    ],
  },
}

module.exports = nextConfig
