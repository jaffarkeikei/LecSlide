/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Next.js options
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Increase API route timeout for processing large files
  api: {
    responseLimit: '8mb',
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}

module.exports = nextConfig 