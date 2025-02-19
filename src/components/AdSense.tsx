'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface AdSenseProps {
    slot: string
    format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
    style?: React.CSSProperties
    responsive?: boolean
    layout?: 'in-article' | 'in-feed'
}

export default function AdSense({
    slot,
    format = 'auto',
    style,
    responsive = true,
    layout,
}: AdSenseProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (error) {
            console.error('Error loading AdSense:', error)
        }
    }, [])

    if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) {
        return null
    }

    return (
        <>
            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
                crossOrigin="anonymous"
                strategy="lazyOnload"
            />
            <div className="ad-container">
                <ins
                    className="adsbygoogle"
                    style={style || { display: 'block' }}
                    data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive}
                    {...(layout && { 'data-ad-layout': layout })}
                />
            </div>
        </>
    )
}

export function InArticleAd() {
    return (
        <AdSense
            slot={process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT!}
            layout="in-article"
            style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '2rem',
                marginBottom: '2rem',
            }}
        />
    )
}

export function SidebarAd() {
    return (
        <AdSense
            slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT!}
            format="vertical"
            style={{
                display: 'block',
                marginBottom: '2rem',
            }}
        />
    )
}

export function ResponsiveAd() {
    return (
        <AdSense
            slot={process.env.NEXT_PUBLIC_ADSENSE_RESPONSIVE_SLOT!}
            format="auto"
            responsive={true}
            style={{
                display: 'block',
                marginTop: '2rem',
                marginBottom: '2rem',
            }}
        />
    )
}
