import { Metadata } from 'next'

interface MetadataProps {
    title?: string
    description?: string
    image?: string
    type?: string
    robots?: string
}

export function generateMetadata({
    title = 'Kshitiz Raj',
    description = 'Full Stack Developer & Technical Writer',
    image = '/og-image.jpg',
    type = 'website',
    robots = 'follow, index',
}: MetadataProps = {}): Metadata {
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: [{ url: image }],
            type: type,
            siteName: 'Kshitiz Raj',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [image],
            creator: '@kshitizrj',
        },
        robots: robots,
        authors: [{ name: 'Kshitiz Raj', url: 'https://kshitiz.com' }],
    }
}
