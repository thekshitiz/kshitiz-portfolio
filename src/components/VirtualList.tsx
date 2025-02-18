'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface VirtualListProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => React.ReactNode
    itemHeight: number
    windowHeight: number
    overscan?: number
}

export function VirtualList<T>({
    items,
    renderItem,
    itemHeight,
    windowHeight,
    overscan = 3,
}: VirtualListProps<T>) {
    const [scrollTop, setScrollTop] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const totalHeight = items.length * itemHeight
    const visibleItems = Math.ceil(windowHeight / itemHeight)
    const startIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - overscan
    )
    const endIndex = Math.min(
        items.length,
        startIndex + visibleItems + 2 * overscan
    )

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleScroll = () => {
            requestAnimationFrame(() => {
                setScrollTop(container.scrollTop)
            })
        }

        container.addEventListener('scroll', handleScroll)
        return () => container.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            ref={containerRef}
            style={{ height: windowHeight, overflow: 'auto' }}
            className="relative"
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                {items.slice(startIndex, endIndex).map((item, index) => (
                    <motion.div
                        key={startIndex + index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            position: 'absolute',
                            top: (startIndex + index) * itemHeight,
                            height: itemHeight,
                            width: '100%',
                        }}
                    >
                        {renderItem(item, startIndex + index)}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
