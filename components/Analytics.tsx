'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

export default function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { scrollYProgress } = useScroll()

    useEffect(() => {
        // Track page views
        const url = `${pathname}${searchParams?.toString()}`
        console.log(`Page view: ${url}`) // Replace with your analytics service
    }, [pathname, searchParams])

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-black dark:bg-white origin-[0%] z-50"
            style={{ scaleX: scrollYProgress }}
        />
    )
}
