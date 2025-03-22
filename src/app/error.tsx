'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                    Error
                </h1>
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Something went wrong!
                </h2>
                <button
                    onClick={() => reset()}
                    className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
