'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

const pages = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
]

export default function NotionNav() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#FFFEFC] dark:bg-[#191919] border-b border-gray-200 dark:border-gray-800 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Desktop Navigation */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                href="/"
                                className="text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
                            >
                                [Your Name]
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
                            {pages.map((page) => (
                                <Link
                                    key={page.name}
                                    href={page.href}
                                    className={`${
                                        pathname === page.href
                                            ? 'bg-gray-100 dark:bg-gray-800'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    } px-3 py-2 rounded-lg text-gray-900 dark:text-white transition-colors`}
                                >
                                    {page.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {isOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                variants={{
                    open: { opacity: 1, height: 'auto' },
                    closed: { opacity: 0, height: 0 },
                }}
                className="sm:hidden overflow-hidden bg-[#FFFEFC] dark:bg-[#191919]"
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {pages.map((page) => (
                        <Link
                            key={page.name}
                            href={page.href}
                            className={`${
                                pathname === page.href
                                    ? 'bg-gray-100 dark:bg-gray-800'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            } block px-3 py-2 rounded-lg text-gray-900 dark:text-white transition-colors`}
                            onClick={() => setIsOpen(false)}
                        >
                            {page.name}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </nav>
    )
}
