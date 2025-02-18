export const withPerformanceMarker = (name: string, fn: () => void) => {
    if (process.env.NODE_ENV === 'development') {
        performance.mark(`${name}-start`)
        fn()
        performance.mark(`${name}-end`)
        performance.measure(name, `${name}-start`, `${name}-end`)
    } else {
        fn()
    }
}
