'use client'

import { Component, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
    errorInfo?: React.ErrorInfo
}

export class CodeSplitBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ errorInfo })
        // Log error to your analytics service
        console.error('Code splitting error:', error, errorInfo)
    }

    retry = () => {
        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined,
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="min-h-[200px] flex items-center justify-center"
                    >
                        <div className="text-center">
                            <h3 className="text-lg font-medium mb-2">
                                Failed to load component
                            </h3>
                            <button
                                onClick={this.retry}
                                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg"
                            >
                                Retry
                            </button>
                        </div>
                    </motion.div>
                )
            )
        }

        return this.props.children
    }
}
