'use client'

import { useEffect } from 'react'

export function PerformanceObserver() {
    useEffect(() => {
        if (!window.performance) return

        const observers = [
            {
                type: 'resource',
                callback: (list: PerformanceObserverEntryList) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.duration > 1000) {
                            console.warn(
                                `Slow resource load: ${entry.name} (${entry.duration}ms)`
                            )
                        }
                    })
                },
            },
            {
                type: 'longtask',
                callback: (list: PerformanceObserverEntryList) => {
                    list.getEntries().forEach((entry) => {
                        console.warn(
                            `Long task detected: ${entry.duration}ms`,
                            entry
                        )
                    })
                },
            },
        ]

        const observerInstances = observers.map(({ type, callback }) => {
            const observer = new PerformanceObserver(callback)
            observer.observe({ entryTypes: [type] })
            return observer
        })

        return () => {
            observerInstances.forEach((observer) => observer.disconnect())
        }
    }, [])

    return null
}
