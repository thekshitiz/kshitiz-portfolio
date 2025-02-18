import { Inter, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'
import { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import SkipToContent from '@/components/SkipToContent'
import { siteConfig } from '@/lib/constants/config'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [{ url: siteConfig.ogImage }],
        locale: 'en-US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="preload"
                    href="/fonts/your-font.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                {/* Preload critical images */}
                <link rel="preload" href="/hero-image.jpg" as="image" />
            </head>
            <body
                className={`${inter.className} ${mono.variable} min-h-screen bg-white dark:bg-gray-900 antialiased`}
            >
                <ThemeProvider>
                    <ErrorBoundary>
                        <SkipToContent />
                        <Header />
                        <main id="main-content">{children}</main>
                        <Footer />
                    </ErrorBoundary>
                </ThemeProvider>
            </body>
        </html>
    )
}
