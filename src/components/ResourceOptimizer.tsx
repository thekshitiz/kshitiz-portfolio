'use client'

import { useEffect } from 'react'

export function ResourceOptimizer() {
    useEffect(() => {
        // Detect idle time to preload resources
        const idleCallback = () => {
            // Preload critical images
            const images = ['/hero-image.jpg', '/about-image.jpg']
            images.forEach((src) => {
                const img = new Image()
                img.src = src
            })

            // Preload critical fonts
            const fonts = [
                { family: 'Inter', weight: '400' },
                { family: 'Inter', weight: '600' },
            ]
            fonts.forEach(({ family, weight }) => {
                document.fonts.load(`${weight} 1em ${family}`)
            })

            // Prefetch critical routes
            const routes = ['/projects', '/about', '/contact']
            routes.forEach((route) => {
                const link = document.createElement('link')
                link.rel = 'prefetch'
                link.href = route
                document.head.appendChild(link)
            })
        }

        if ('requestIdleCallback' in window) {
            // @ts-ignore
            window.requestIdleCallback(idleCallback)
        } else {
            setTimeout(idleCallback, 1000)
        }
    }, [])

    return null
}
