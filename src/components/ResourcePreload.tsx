'use client'

import { useEffect } from 'react'

const resources = [
    { href: '/fonts/your-font.woff2', as: 'font', type: 'font/woff2' },
    { href: '/hero-image.jpg', as: 'image' },
    // Add more critical resources
]

export function ResourcePreload() {
    useEffect(() => {
        resources.forEach(({ href, as, type }) => {
            const link = document.createElement('link')
            link.rel = 'preload'
            link.href = href
            link.as = as
            if (type) link.type = type
            document.head.appendChild(link)
        })
    }, [])

    return null
}
