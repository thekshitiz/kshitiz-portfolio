import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
    title: {
        default: 'Your Portfolio',
        template: '%s | Your Portfolio',
    },
    description:
        'Professional portfolio showcasing web development projects and skills',
    keywords: ['portfolio', 'web development', 'react', 'next.js'],
    authors: [{ name: 'Your Name' }],
    creator: 'Your Name',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        siteName: 'Your Portfolio',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Your Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@yourhandle',
    },
    robots: {
        index: true,
        follow: true,
    },
}
