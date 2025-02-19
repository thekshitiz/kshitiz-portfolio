'use client'

import { motion } from 'framer-motion'
import { colors } from '@/lib/constants/colors'

interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'text'
    href?: string
    onClick?: () => void
    className?: string
    icon?: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
}

export function Button({
    children,
    variant = 'primary',
    href,
    onClick,
    className = '',
    icon,
    size = 'md',
    disabled = false,
}: ButtonProps) {
    const Component = href ? 'a' : 'button'

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    }

    const baseClasses = `
        inline-flex items-center justify-center
        font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        rounded-md
    `

    const variantClasses = {
        primary: `
            bg-[#27667B] hover:bg-[#1D4D5D] 
            dark:bg-[#27667B] dark:hover:bg-[#1D4D5D]
            text-white
        `,
        secondary: `
            bg-[#A0C878] hover:bg-[#8AB562]
            dark:bg-[#A0C878] dark:hover:bg-[#8AB562]
            text-white
        `,
        outline: `
            border border-[#E6E6E6] dark:border-[#363636]
            hover:border-[#27667B] dark:hover:border-[#27667B]
            text-[#2E2E2E] dark:text-white
            hover:bg-[#F7F7F7] dark:hover:bg-[#363636]
        `,
        text: `
            text-[#27667B] dark:text-[#A0C878]
            hover:bg-[#F7F7F7] dark:hover:bg-[#363636]
        `,
    }

    return (
        <motion.div
            whileHover={disabled ? undefined : { scale: 1.01 }}
            whileTap={disabled ? undefined : { scale: 0.99 }}
            className="inline-block"
        >
            <Component
                href={href}
                onClick={onClick}
                disabled={disabled}
                className={`
                    ${baseClasses}
                    ${variantClasses[variant]}
                    ${sizeClasses[size]}
                    ${className}
                `}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {children}
            </Component>
        </motion.div>
    )
}
