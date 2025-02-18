'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { motion, AnimatePresence } from 'framer-motion'

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
    loadingColor?: string
}

export default function LazyImage({
    loadingColor = '#f3f4f6',
    ...props
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [ref, isVisible] = useIntersectionObserver({
        freezeOnceVisible: true,
        rootMargin: '50px',
    })

    return (
        <div
            ref={ref}
            className="relative overflow-hidden"
            style={{ aspectRatio: props.width + '/' + props.height }}
        >
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                        style={{ backgroundColor: loadingColor }}
                    />
                )}
            </AnimatePresence>

            {isVisible && (
                <Image
                    {...props}
                    onLoad={() => setIsLoaded(true)}
                    className={`transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${props.className || ''}`}
                />
            )}
        </div>
    )
}
