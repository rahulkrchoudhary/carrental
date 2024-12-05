/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static file export
    trailingSlash: true, // Ensures proper folder structure for static hosting
    images: {
      unoptimized: true, // Disable Next.js image optimization
    },
  };
  
  module.exports = nextConfig;
  