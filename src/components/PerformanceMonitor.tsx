'use client'

import { useEffect } from 'react'
import { usePerformanceTrack } from '@/hooks/usePerformanceTrack'

export function PerformanceMonitor() {
    const metrics = usePerformanceTrack()

    useEffect(() => {
        // Log performance metrics
        if (Object.keys(metrics).length > 0) {
            console.log('Performance Metrics:', metrics)
            // Send metrics to your analytics service
        }
    }, [metrics])

    return null
}
