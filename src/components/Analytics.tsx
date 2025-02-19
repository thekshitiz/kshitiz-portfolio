'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
            const url = `${pathname}${
                searchParams?.toString() ? `?${searchParams.toString()}` : ''
            }`
            // Send pageview to Google Analytics
            window.gtag?.('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
                page_path: url,
            })
        }
    }, [pathname, searchParams])

    return null
}
