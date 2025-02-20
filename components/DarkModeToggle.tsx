'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function DarkModeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
        >
            {theme === 'dark' ? (
                // Sun icon
                <motion.svg
                    initial={{ rotate: -45 }}
                    animate={{ rotate: 0 }}
                    className="w-5 h-5 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                    />
                </motion.svg>
            ) : (
                // Moon icon
                <motion.svg
                    initial={{ rotate: 45 }}
                    animate={{ rotate: 0 }}
                    className="w-5 h-5 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </motion.svg>
            )}
        </motion.button>
    )
}
