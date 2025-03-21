// This is the main layout file that wraps all pages
// Note: This file must be a Server Component to export metadata

import { Inter } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'
import { Providers } from '@/components/Providers'
import { Analytics } from '@/components/Analytics'
import '@/styles/globals.css'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/constants/config'
import { Suspense } from 'react'

// Configure fonts
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

// SEO and social sharing metadata
export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    ),
    title: siteConfig.title,
    description: siteConfig.description,

    // Open Graph metadata (for social sharing)
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [{ url: siteConfig.ogImage }],
        locale: 'en-US',
        type: 'website',
    },

    // Search engine instructions
    robots: {
        index: true, // Allow search engines to index
        follow: true, // Allow following links
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Favicon and icons
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
}

// Main layout component
export default function RootLayout({
    children, // The page content
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <head>
                {/* Preload critical resources */}
                <link
                    rel="preload"
                    href="/fonts/your-font.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link rel="preload" href="/hero-image.jpg" as="image" />
            </head>
            <body className="bg-white dark:bg-gray-900 antialiased">
                <Providers>
                    <ClientLayout>{children}</ClientLayout>
                    <Suspense fallback={null}>
                        <Analytics />
                    </Suspense>
                </Providers>
            </body>
        </html>
    )
}
