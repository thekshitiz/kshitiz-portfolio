'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DarkModeToggle from '@/components/DarkModeToggle'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/"
                            className="text-2xl font-bold text-gray-900 dark:text-white"
                        >
                            K.
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {['About', 'Projects', 'Contact'].map((item) => (
                            <motion.div
                                key={item}
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                <Link
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                        <DarkModeToggle />
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <motion.span
                                animate={
                                    isMenuOpen
                                        ? { rotate: 45, y: 8 }
                                        : { rotate: 0, y: 0 }
                                }
                                className="w-full h-0.5 bg-gray-900 dark:bg-white transform origin-left transition-transform"
                            />
                            <motion.span
                                animate={
                                    isMenuOpen ? { opacity: 0 } : { opacity: 1 }
                                }
                                className="w-full h-0.5 bg-gray-900 dark:bg-white"
                            />
                            <motion.span
                                animate={
                                    isMenuOpen
                                        ? { rotate: -45, y: -8 }
                                        : { rotate: 0, y: 0 }
                                }
                                className="w-full h-0.5 bg-gray-900 dark:bg-white transform origin-left transition-transform"
                            />
                        </div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.nav
                initial={false}
                animate={
                    isMenuOpen
                        ? { height: 'auto', opacity: 1 }
                        : { height: 0, opacity: 0 }
                }
                className="md:hidden overflow-hidden bg-white dark:bg-gray-900"
            >
                <div className="px-4 py-2 space-y-1">
                    {['About', 'Projects', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="block py-2 text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <div className="py-2">
                        <DarkModeToggle />
                    </div>
                </div>
            </motion.nav>
        </motion.header>
    )
}
