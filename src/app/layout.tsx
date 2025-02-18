// This is the main layout file that wraps all pages
// Note: This file must be a Server Component to export metadata

import { Inter, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'
import { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import SkipToContent from '@/components/SkipToContent'
import { siteConfig } from '@/lib/constants/config'

// Configure fonts
const inter = Inter({ subsets: ['latin'] }) // Main font
const mono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono', // Makes font available as CSS variable
})

// SEO and social sharing metadata
export const metadata: Metadata = {
    // Basic metadata
    title: {
        default: siteConfig.name, // Default page title
        template: `%s | ${siteConfig.name}`, // Template for other pages
    },
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
        <html lang="en" suppressHydrationWarning>
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
            <body
                // Apply fonts and theme classes
                className={`${inter.className} ${mono.variable} min-h-screen bg-white dark:bg-gray-900 antialiased`}
            >
                <ThemeProvider>
                    <ErrorBoundary>
                        <SkipToContent /> {/* Accessibility feature */}
                        <Header /> {/* Navigation */}
                        <main id="main-content">{children}</main>
                        <Footer /> {/* Footer */}
                    </ErrorBoundary>
                </ThemeProvider>
            </body>
        </html>
    )
}
