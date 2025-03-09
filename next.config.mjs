/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true, // Enable ESM support
  },
  output: "export",
  basePath: "/2d-floor-plan-creator", 
  assetPrefix: "/2d-floor-plan-creator/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
