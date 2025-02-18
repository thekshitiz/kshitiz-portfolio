import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Your Portfolio',
    description: 'Your portfolio description',
    viewport: 'width=device-width, initial-scale=1',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
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
            <body className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
