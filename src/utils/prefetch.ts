import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function usePrefetch(routes: string[]) {
    const router = useRouter()

    useEffect(() => {
        routes.forEach((route) => {
            router.prefetch(route)
        })
    }, [router, routes])
}

// Usage example:
// usePrefetch(['/projects', '/about', '/contact'])
