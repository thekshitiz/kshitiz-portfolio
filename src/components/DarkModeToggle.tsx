'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function DarkModeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-10 h-10" /> // Placeholder to prevent layout shift
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={`Switch to ${
                theme === 'dark' ? 'light' : 'dark'
            } theme`}
        >
            {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            ) : (
                <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            )}
        </button>
    )
}
