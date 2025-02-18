'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OptimizedImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    priority?: boolean
    className?: string
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    priority = false,
    className = '',
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="relative overflow-hidden">
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                className={`transition-opacity duration-300 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                } ${className}`}
                onLoadingComplete={() => setIsLoading(false)}
                loading={priority ? 'eager' : 'lazy'}
            />
        </div>
    )
}
