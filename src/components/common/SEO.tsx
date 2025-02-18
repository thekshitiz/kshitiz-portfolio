import Head from 'next/head'
import { siteConfig } from '@/lib/constants/config'

interface SEOProps {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: string
}

export function SEO({
    title = siteConfig.name,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    url = siteConfig.url,
    type = 'website',
}: SEOProps) {
    const seo = {
        title: title + ' | ' + siteConfig.name,
        description,
        image,
        url,
    }

    return (
        <Head>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />

            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content={type} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

            <link rel="canonical" href={seo.url} />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: 'Kshitiz',
                        url: siteConfig.url,
                        sameAs: [
                            siteConfig.links.github,
                            siteConfig.links.linkedin,
                        ],
                    }),
                }}
            />
        </Head>
    )
}
