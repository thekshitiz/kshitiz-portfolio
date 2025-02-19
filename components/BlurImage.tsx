'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface BlurImageProps {
    src: string
    alt: string
    width: number
    height: number
    className?: string
}

export default function BlurImage({
    src,
    alt,
    width,
    height,
    className = '',
}: BlurImageProps) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="blur"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
                    />
                )}
            </AnimatePresence>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`transition-opacity duration-500 ${className} ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoadingComplete={() => setIsLoading(false)}
            />
        </div>
    )
}
