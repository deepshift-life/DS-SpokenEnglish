import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@ds/types', '@ds/audio', '@ds/db', '@ds/core', '@ds/ui'],
  experimental: {
    viewTransition: true,
  },
}

export default nextConfig
