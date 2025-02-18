'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero3D() {
    return (
        <div className="min-h-screen bg-[#FFFEFC] dark:bg-[#191919] px-4 md:px-24 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                {/* Notion-like breadcrumb */}
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <span className="hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded cursor-pointer">
                        Portfolio
                    </span>{' '}
                    /{' '}
                    <span className="hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded cursor-pointer">
                        Home
                    </span>
                </div>

                {/* Main title with Notion-like styling */}
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors cursor-text">
                    Hello, I'm [Your Name]
                </h1>

                {/* Notion-like paragraph */}
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors cursor-text">
                    A creative developer focused on building elegant and
                    functional digital experiences.
                </p>

                {/* Notion-like callout */}
                <div className="bg-[#F7F6F3] dark:bg-gray-800 p-6 rounded-lg mb-12">
                    <div className="flex items-start gap-4">
                        <span className="text-2xl">💡</span>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                                Currently available for work
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Open to freelance projects and full-time
                                opportunities.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Notion-like buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="#work"
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#E16259] hover:bg-[#C54C43] text-white rounded-lg transition-colors"
                    >
                        View Work →
                    </Link>
                    <Link
                        href="#contact"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-colors"
                    >
                        Contact Me
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
