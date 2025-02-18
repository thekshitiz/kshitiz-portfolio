'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                if (isOpen) {
                    onClose()
                } else {
                    document.getElementById('search-input')?.focus()
                }
            }
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen px-4 text-center"
            >
                <div
                    className="fixed inset-0 bg-black/20 dark:bg-black/40"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="inline-block w-full max-w-2xl my-8 p-6 overflow-hidden text-left align-middle bg-white dark:bg-gray-900 rounded-xl shadow-xl transform transition-all"
                >
                    <div className="relative">
                        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                        <input
                            id="search-input"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white"
                            autoFocus
                        />
                        <button
                            onClick={onClose}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-500"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Search Results */}
                    <div className="mt-4 max-h-96 overflow-y-auto">
                        {searchQuery && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-2"
                            >
                                {/* Add your search results here */}
                                <div className="text-gray-500 dark:text-gray-400">
                                    No results found for "{searchQuery}"
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
