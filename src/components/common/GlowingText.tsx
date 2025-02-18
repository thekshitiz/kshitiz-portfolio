'use client'

import { motion } from 'framer-motion'

interface GlowingTextProps {
    children: React.ReactNode
    className?: string
}

export function GlowingText({ children, className = '' }: GlowingTextProps) {
    return (
        <motion.span
            className={`relative inline-block ${className}`}
            whileHover={{ scale: 1.02 }}
        >
            <span className="relative z-10">{children}</span>
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 blur-xl"
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
            />
        </motion.span>
    )
}
