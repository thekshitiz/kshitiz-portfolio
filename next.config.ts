import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // Enable static optimization
    optimizeFonts: true,
    // Enable image optimization
    images: {
        domains: ['placeholder.com'], // Add any image domains you're using
        unoptimized: process.env.NODE_ENV === 'development',
    },
    // Disable CSS optimization in development to prevent critters issues
    optimizeCss: process.env.NODE_ENV === 'production',
}

export default nextConfig
