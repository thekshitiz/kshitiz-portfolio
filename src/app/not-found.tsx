'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function NotFoundContent() {
    const searchParams = useSearchParams()
    const from = searchParams.get('from') || ''

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {from
                        ? `The page "${from}" could not be found.`
                        : "The page you're looking for doesn't exist."}
                </p>
                <Link
                    href="/"
                    className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                    Return Home
                </a>
            </div>
        </div>
    )
}
