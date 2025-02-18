'use client'

import { motion } from 'framer-motion'

export function GridBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
                style={{
                    backgroundSize: '400% 400%',
                    backgroundImage:
                        'radial-gradient(circle at 50% 50%, rgba(var(--primary), 0.3), transparent 50%)',
                }}
            />
        </div>
    )
}
