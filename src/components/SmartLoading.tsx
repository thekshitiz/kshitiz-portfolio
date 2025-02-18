'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SmartLoadingProps {
    fallback?: React.ReactNode
}

export function SmartLoading({ fallback }: SmartLoadingProps) {
    const [connection, setConnection] = useState<string>('4g')

    useEffect(() => {
        if ('connection' in navigator) {
            // @ts-ignore
            const conn = navigator.connection
            setConnection(conn.effectiveType)

            // @ts-ignore
            conn.addEventListener('change', () => {
                setConnection(conn.effectiveType)
            })
        }
    }, [])

    // Show simplified loading for slow connections
    if (connection === 'slow-2g' || connection === '2g') {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="text-sm text-gray-600">Loading...</div>
            </div>
        )
    }

    // Show default loading animation for better connections
    return (
        fallback || (
            <motion.div
                className="flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </motion.div>
        )
    )
}
