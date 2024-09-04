/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: [
      'api-conectiverse-dev.uk.oxa.cloud',
      'api-staging-conectiverse.uk.oxa.cloud',
      'localhost',
      '51.83.16.208',
      'api-staging.conect4youth.com'
    ],
    unoptimized: true
  },
  typescript: { ignoreBuildErrors: true },
  output: 'export'
}

module.exports = nextConfig
