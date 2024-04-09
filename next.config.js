/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false, // Disable font optimization
  images: {
    unoptimized: true,
  },
};
  
  module.exports = nextConfig;
  