/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Ignore build-time linting/type errors on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Disable image optimization (Vercel handles this or Supabase public URLs)
  images: {
    unoptimized: true,
  },

  // ✅ (Optional) If using environment variables at runtime
  experimental: {
    serverActions: {
      allowedOrigins: ['*'], // or your Vercel domain if you want to be stricter
    },
  },

  // ✅ For edge compatibility (optional, helps with Supabase SSR)
  reactStrictMode: true,
}

export default nextConfig

