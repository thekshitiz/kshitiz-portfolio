'use client'

import { useState, useEffect } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageProps extends NextImageProps {
    fallback?: string
}

export default function Image({
    fallback = '/placeholder.jpg',
    ...props
}: ImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    return (
        <div className="relative">
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"
                    />
                )}
            </AnimatePresence>
            <NextImage
                {...props}
                src={error ? fallback : props.src}
                onLoadingComplete={() => setIsLoading(false)}
                onError={() => setError(true)}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    )
}
