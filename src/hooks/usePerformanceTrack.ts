import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
    FCP: number // First Contentful Paint
    LCP: number // Largest Contentful Paint
    FID: number // First Input Delay
    CLS: number // Cumulative Layout Shift
    TTFB: number // Time to First Byte
}

export function usePerformanceTrack(
    onMetrics?: (metrics: PerformanceMetrics) => void
) {
    const metrics = useRef<Partial<PerformanceMetrics>>({})

    useEffect(() => {
        if (!window.performance) return

        // Observer for LCP
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            const lastEntry = entries[entries.length - 1]
            metrics.current.LCP = lastEntry.startTime
        })

        // Observer for FID
        const fidObserver = new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0]
            metrics.current.FID =
                firstInput.processingStart - firstInput.startTime
        })

        // Observer for CLS
        const clsObserver = new PerformanceObserver((entryList) => {
            let clsScore = 0
            entryList.getEntries().forEach((entry: any) => {
                if (!entry.hadRecentInput) {
                    clsScore += entry.value
                }
            })
            metrics.current.CLS = clsScore
        })

        // Start observations
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        fidObserver.observe({ entryTypes: ['first-input'] })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        // Get FCP
        const fcpObserver = new PerformanceObserver((entryList) => {
            const firstPaint = entryList.getEntries()[0]
            metrics.current.FCP = firstPaint.startTime
        })
        fcpObserver.observe({ entryTypes: ['paint'] })

        // Get TTFB
        const navigationEntry = performance.getEntriesByType(
            'navigation'
        )[0] as PerformanceNavigationTiming
        metrics.current.TTFB = navigationEntry.responseStart

        return () => {
            lcpObserver.disconnect()
            fidObserver.disconnect()
            clsObserver.disconnect()
            fcpObserver.disconnect()
        }
    }, [])

    return metrics.current
}
