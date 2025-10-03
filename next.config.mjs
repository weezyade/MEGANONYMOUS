/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  experimental: {
    appDir: true,
  },
  output: "standalone", // ensures server functions are deployed properly
};

export default nextConfig;

