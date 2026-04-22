import type { NextConfig } from 'next'

const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === 'true'
const repoName = 'DS-SpokenEnglish'

const nextConfig: NextConfig = {
  ...(isStaticPreview
    ? {
        output: 'export' as const,
        trailingSlash: true,
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        images: { unoptimized: true },
      }
    : {}),
  transpilePackages: ['@ds/types', '@ds/audio', '@ds/db', '@ds/core', '@ds/ui'],
  experimental: {
    viewTransition: true,
  },
}

export default nextConfig
