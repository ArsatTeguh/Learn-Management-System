/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false, // Disable font optimization
  output: 'standalone',
  images: {
    domains: ['utfs.io', 'files.edgestore.dev'],
  },
};
  
  module.exports = nextConfig;
  