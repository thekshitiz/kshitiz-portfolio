import { useEffect } from 'react'

export function usePerformanceMonitor(componentName: string) {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            performance.mark(`${componentName}-mount-start`)

            return () => {
                performance.mark(`${componentName}-mount-end`)
                performance.measure(
                    `${componentName}-mount`,
                    `${componentName}-mount-start`,
                    `${componentName}-mount-end`
                )

                // Log performance metrics
                const entries = performance.getEntriesByType('measure')
                console.table(
                    entries.map((entry) => ({
                        component: entry.name,
                        duration: `${entry.duration.toFixed(2)}ms`,
                    }))
                )
            }
        }
    }, [componentName])
}
