'use client'

import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'
import { motion } from 'framer-motion'

export default function Header() {
    return (
        <header className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="font-bold text-xl text-gray-900 dark:text-white"
                        >
                            Your Name
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-10">
                        <Link
                            href="#about"
                            className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            About
                        </Link>
                        <Link
                            href="/projects"
                            className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            Projects
                        </Link>
                        <Link
                            href="#portfolio"
                            className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="#skills"
                            className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            Skills
                        </Link>
                        <Link
                            href="#services"
                            className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            Services
                        </Link>
                        <Link
                            href="#contact"
                            className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center">
                        <DarkModeToggle />
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/resume"
                                className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100"
                            >
                                Resume
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </header>
    )
} 