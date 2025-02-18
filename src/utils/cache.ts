type CacheOptions = {
    maxAge?: number // in milliseconds
    staleWhileRevalidate?: boolean
}

class AdvancedCache {
    private cache: Map<string, { data: any; timestamp: number }>
    private maxSize: number

    constructor(maxSize = 100) {
        this.cache = new Map()
        this.maxSize = maxSize
    }

    async get<T>(
        key: string,
        fetcher: () => Promise<T>,
        options: CacheOptions = {}
    ): Promise<T> {
        const cached = this.cache.get(key)
        const now = Date.now()

        if (cached) {
            const isStale =
                options.maxAge && now - cached.timestamp > options.maxAge

            if (!isStale) {
                return cached.data
            }

            if (options.staleWhileRevalidate) {
                // Return stale data while fetching fresh data
                this.fetchAndCache(key, fetcher)
                return cached.data
            }
        }

        return this.fetchAndCache(key, fetcher)
    }

    private async fetchAndCache<T>(
        key: string,
        fetcher: () => Promise<T>
    ): Promise<T> {
        const data = await fetcher()

        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value
            this.cache.delete(oldestKey)
        }

        this.cache.set(key, { data, timestamp: Date.now() })
        return data
    }

    clear() {
        this.cache.clear()
    }
}

export const globalCache = new AdvancedCache()
