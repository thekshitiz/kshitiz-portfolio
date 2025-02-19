import { Metadata } from 'next'

interface GenerateMetadataProps {
    title: string
    description: string
    image?: string
    noIndex?: boolean
}

export function generateMetadata({
    title,
    description,
    image = '/og-image.jpg',
    noIndex = false,
}: GenerateMetadataProps): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: image }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
        },
    }
}
