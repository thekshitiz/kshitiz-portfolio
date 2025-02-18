'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DarkModeToggle from './DarkModeToggle'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import SearchModal from './SearchModal'

interface NavItem {
    label: string
    href?: string
    sectionId?: string
    dropdownItems?: {
        label: string
        href: string
        description?: string
    }[]
}

const navItems: NavItem[] = [
    {
        label: 'About',
        sectionId: 'about',
    },
    {
        label: 'Work',
        dropdownItems: [
            {
                label: 'Projects',
                href: '/projects',
                description: 'View my featured projects and case studies',
            },
            {
                label: 'Portfolio',
                href: '/#portfolio',
                description: 'Explore my complete body of work',
            },
        ],
    },
    {
        label: 'Skills',
        sectionId: 'skills',
    },
    {
        label: 'Services',
        sectionId: 'services',
    },
    {
        label: 'Contact',
        sectionId: 'contact',
    },
]

export default function Header() {
    const pathname = usePathname()
    const isHomePage = pathname === '/'
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll =
                document.documentElement.scrollHeight - window.innerHeight
            const currentProgress = (window.scrollY / totalScroll) * 100
            setScrollProgress(currentProgress)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        if (!isHomePage) {
            window.location.href = `/#${sectionId}`
            return
        }

        const element = document.getElementById(sectionId)
        element?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleNavigation = (item: NavItem) => {
        if (item.sectionId) {
            scrollToSection(item.sectionId)
        }
        setOpenDropdown(null)
    }

    return (
        <>
            <header className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10">
                {/* Progress Bar */}
                {isHomePage && (
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800">
                        <motion.div
                            className="h-full bg-black dark:bg-white"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>
                )}

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="font-bold text-xl text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
                            >
                                Your Name
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {/* Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                                <MagnifyingGlassIcon className="h-5 w-5" />
                                <span className="text-sm">Quick Search...</span>
                                <span className="text-xs text-gray-400 border px-1.5 py-0.5 rounded">
                                    ⌘K
                                </span>
                            </button>

                            {/* Keep existing navItems mapping */}
                            {navItems.map((item) => (
                                <div key={item.label} className="relative">
                                    {item.dropdownItems ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setOpenDropdown(
                                                        openDropdown ===
                                                            item.label
                                                            ? null
                                                            : item.label
                                                    )
                                                }
                                                className="flex items-center space-x-1 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                            >
                                                <span>{item.label}</span>
                                                <ChevronDownIcon className="h-4 w-4" />
                                            </button>
                                            <AnimatePresence>
                                                {openDropdown ===
                                                    item.label && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: 10,
                                                        }}
                                                        className="absolute left-0 mt-2 w-64 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5"
                                                    >
                                                        <div className="p-2">
                                                            {item.dropdownItems.map(
                                                                (
                                                                    dropdownItem
                                                                ) => (
                                                                    <Link
                                                                        key={
                                                                            dropdownItem.label
                                                                        }
                                                                        href={
                                                                            dropdownItem.href
                                                                        }
                                                                        onClick={() =>
                                                                            setOpenDropdown(
                                                                                null
                                                                            )
                                                                        }
                                                                        className="block px-4 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                    >
                                                                        <span className="block text-sm font-medium text-gray-900 dark:text-white">
                                                                            {
                                                                                dropdownItem.label
                                                                            }
                                                                        </span>
                                                                        {dropdownItem.description && (
                                                                            <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                                                {
                                                                                    dropdownItem.description
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </Link>
                                                                )
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleNavigation(item)
                                            }
                                            className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                        >
                                            {item.label}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Right Side Items */}
                        <div className="flex items-center space-x-4">
                            <DarkModeToggle />

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                            >
                                {isMobileMenuOpen ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </button>

                            {/* Resume Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden md:block"
                            >
                                <Link
                                    href="/resume"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
                                >
                                    Resume
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="fixed inset-0 z-50 md:hidden"
                >
                    <div
                        className="absolute inset-0 bg-black/20 dark:bg-black/40"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <motion.div className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl">
                        <div className="p-6 space-y-6">
                            {navItems.map((item) => (
                                <div key={item.label}>
                                    {item.dropdownItems ? (
                                        <div className="space-y-2">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {item.label}
                                            </div>
                                            {item.dropdownItems.map(
                                                (dropdownItem) => (
                                                    <Link
                                                        key={dropdownItem.label}
                                                        href={dropdownItem.href}
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false
                                                            )
                                                        }
                                                        className="block pl-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                                    >
                                                        {dropdownItem.label}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                handleNavigation(item)
                                                setIsMobileMenuOpen(false)
                                            }}
                                            className="block w-full text-left font-medium text-gray-900 dark:text-white"
                                        >
                                            {item.label}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Search Modal */}
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    )
}
