/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'standalone' for Vercel deployments
  
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['*'], // Merged both experimental configs
    },
  },
  
  eslint: { 
    ignoreDuringBuilds: true 
  },
  
  typescript: { 
    ignoreBuildErrors: true 
  },
  
  images: { 
    unoptimized: true 
  },
  
  reactStrictMode: true,
}

export default nextConfig