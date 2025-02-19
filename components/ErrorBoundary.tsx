'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center px-4"
                    >
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            {this.state.error?.message || 'An error occurred'}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium"
                        >
                            Refresh Page
                        </motion.button>
                    </motion.div>
                </div>
            )
        }

        return this.props.children
    }
}
