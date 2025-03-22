/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        minimumCacheTTL: 60,
        domains: ['images.unsplash.com', 'placeholder.com'],
        unoptimized: process.env.NODE_ENV === 'development',
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['@heroicons/react', 'framer-motion'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    poweredByHeader: false,
    webpack: (config, { dev, isServer }) => {
        // Production optimizations
        if (!dev && !isServer) {
            // Enable tree shaking and minification
            config.optimization = {
                ...config.optimization,
                minimize: true,
                splitChunks: {
                    chunks: 'all',
                    minSize: 20000,
                    maxSize: 244000,
                    minChunks: 1,
                    maxAsyncRequests: 30,
                    maxInitialRequests: 30,
                    cacheGroups: {
                        defaultVendors: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            reuseExistingChunk: true,
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                    },
                },
            }
        }
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    },
}

module.exports = nextConfig
