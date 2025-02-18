/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['placeholder.com'], // Add any image domains you'll use
    },
    experimental: {
        appDir: true,
    },
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        }
        return config
    },
}

module.exports = nextConfig
