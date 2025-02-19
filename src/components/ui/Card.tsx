'use client'

import { motion } from 'framer-motion'
import { colors } from '@/lib/constants/colors'
import { useTheme } from 'next-themes'

interface CardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
    padding?: 'none' | 'small' | 'medium' | 'large'
}

export function Card({
    children,
    className = '',
    hover = true,
    padding = 'medium',
}: CardProps) {
    const { theme } = useTheme()

    const paddingClasses = {
        none: '',
        small: 'p-4',
        medium: 'p-6',
        large: 'p-8',
    }

    return (
        <motion.div
            whileHover={hover ? { y: -2 } : undefined}
            className={`
                bg-white dark:bg-[#2D2D2D] 
                border border-[#E6E6E6] dark:border-[#363636]
                rounded-lg transition-all duration-200
                ${hover ? 'hover:shadow-lg hover:border-[#A0C878] dark:hover:border-[#27667B]' : ''}
                ${paddingClasses[padding]}
                ${className}
            `}
        >
            {children}
        </motion.div>
    )
}
