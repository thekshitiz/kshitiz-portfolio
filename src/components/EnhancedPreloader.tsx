'use client'

import { useEffect, useRef } from 'react'

interface Resource {
    type: 'image' | 'font' | 'script' | 'style' | 'route'
    path: string
    priority?: 'high' | 'low'
    options?: {
        as?: string
        type?: string
        crossOrigin?: string
        media?: string
    }
}

const criticalResources: Resource[] = [
    { type: 'image', path: '/hero-image.jpg', priority: 'high' },
    { type: 'font', path: '/fonts/inter-var.woff2', priority: 'high' },
    { type: 'route', path: '/projects', priority: 'high' },
    { type: 'script', path: '/animations.js', priority: 'low' },
]

export function EnhancedPreloader() {
    const observer = useRef<IntersectionObserver | null>(null)
    const loadedResources = useRef(new Set())

    useEffect(() => {
        const loadResource = (resource: Resource) => {
            if (loadedResources.current.has(resource.path)) return

            switch (resource.type) {
                case 'image':
                    const img = new Image()
                    img.src = resource.path
                    break

                case 'font':
                    const link = document.createElement('link')
                    link.rel = 'preload'
                    link.as = 'font'
                    link.href = resource.path
                    link.type = 'font/woff2'
                    link.crossOrigin = 'anonymous'
                    document.head.appendChild(link)
                    break

                case 'route':
                    const routeLink = document.createElement('link')
                    routeLink.rel = 'prefetch'
                    routeLink.href = resource.path
                    document.head.appendChild(routeLink)
                    break

                case 'script':
                    const script = document.createElement('link')
                    script.rel = 'preload'
                    script.as = 'script'
                    script.href = resource.path
                    document.head.appendChild(script)
                    break
            }

            loadedResources.current.add(resource.path)
        }

        // Load high priority resources immediately
        criticalResources
            .filter((r) => r.priority === 'high')
            .forEach(loadResource)

        // Load low priority resources during idle time
        const loadLowPriority = () => {
            criticalResources
                .filter((r) => r.priority === 'low')
                .forEach(loadResource)
        }

        if ('requestIdleCallback' in window) {
            // @ts-ignore
            window.requestIdleCallback(loadLowPriority, { timeout: 2000 })
        } else {
            setTimeout(loadLowPriority, 1000)
        }

        // Cleanup
        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [])

    return null
}
