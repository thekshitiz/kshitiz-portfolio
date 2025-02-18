import { useState, useEffect } from 'react'
import { globalCache } from '@/utils/cache'

interface CacheConfig {
    key: string
    maxAge?: number
    staleWhileRevalidate?: boolean
    onError?: (error: Error) => void
}

export function useAdvancedCache<T>(
    fetcher: () => Promise<T>,
    config: CacheConfig
) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await globalCache.get(config.key, fetcher, {
                    maxAge: config.maxAge,
                    staleWhileRevalidate: config.staleWhileRevalidate,
                })
                setData(result)
                setError(null)
            } catch (err) {
                const error =
                    err instanceof Error ? err : new Error(String(err))
                setError(error)
                config.onError?.(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [config.key, fetcher])

    return { data, error, isLoading }
}
