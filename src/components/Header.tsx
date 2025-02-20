'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import DarkModeToggle from './DarkModeToggle'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const navItems = [
    { href: '/#home', label: 'Home' },
    {
        label: 'Work',
        dropdownItems: [
            {
                label: 'Portfolio',
                href: '/portfolio',
                description: 'View my featured projects',
            },
            {
                label: 'Blog',
                href: '/blog',
                description: 'Read my thoughts and tutorials',
            },
        ],
    },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
]

export default function Header() {
    const pathname = usePathname()
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string>('')
    const isVisible = useScrollDirection()

    // Handle navigation and scroll
    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement> | null,
        href: string
    ) => {
        if (e) e.preventDefault()

        if (href.startsWith('/#')) {
            // Handle same page section navigation
            if (pathname !== '/') {
                // If we're not on home page, go to home page first
                window.location.href = href
                return
            }
            const targetId = href.replace('/#', '')
            const element = document.getElementById(targetId)
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
                setActiveSection(targetId)
            }
        } else {
            // For other pages, use window.location for a full page load
            window.location.href = href
        }
    }

    // Update active section based on scroll position and current route
    useEffect(() => {
        if (pathname !== '/') {
            setActiveSection('')
            return
        }

        const handleScroll = () => {
            if (pathname !== '/') return

            const sections = ['home', 'portfolio', 'about', 'contact']
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    return rect.top <= 100 && rect.bottom >= 100
                }
                return false
            })
            if (currentSection) {
                setActiveSection(currentSection)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [pathname])

    // Reset mobile menu and dropdown when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false)
        setOpenDropdown(null)
    }, [pathname])

    // Determine if a nav item is active
    const isNavItemActive = (href: string) => {
        if (href.startsWith('/#')) {
            // For home page sections
            return pathname === '/' && activeSection === href.replace('/#', '')
        }
        // For other pages
        return pathname === href
    }

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-[100] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl backdrop-saturate-200 border-b border-gray-200/5 dark:border-gray-800/5 transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                }}
            >
                <nav className="container mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
                        >
                            Kshitiz
                        </Link>

                        <div className="flex items-center gap-8">
                            <div className="hidden md:flex items-center gap-8">
                                {navItems.map((item) => {
                                    if ('dropdownItems' in item) {
                                        return (
                                            <div
                                                key={item.label}
                                                className="relative group"
                                                onMouseEnter={() =>
                                                    setOpenDropdown(item.label)
                                                }
                                                onMouseLeave={() =>
                                                    setOpenDropdown(null)
                                                }
                                            >
                                                <button className="flex items-center gap-1.5 py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all group-hover:bg-gray-100/50 dark:group-hover:bg-gray-800/50 rounded-full">
                                                    {item.label}
                                                    <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                                </button>

                                                <AnimatePresence>
                                                    {openDropdown ===
                                                        item.label && (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                y: 8,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                y: 8,
                                                            }}
                                                            transition={{
                                                                duration: 0.15,
                                                            }}
                                                            className="absolute top-full -left-2 mt-2 w-56 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg shadow-black/5 dark:shadow-white/5 border border-gray-200/20 dark:border-gray-700/20 py-2"
                                                        >
                                                            {item.dropdownItems.map(
                                                                (
                                                                    dropdownItem
                                                                ) => (
                                                                    <Link
                                                                        key={
                                                                            dropdownItem.href
                                                                        }
                                                                        href={
                                                                            dropdownItem.href
                                                                        }
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleClick(
                                                                                e,
                                                                                dropdownItem.href
                                                                            )
                                                                        }
                                                                        className="block px-4 py-3 text-sm hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                                                                    >
                                                                        <span className="block font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                                                                            {
                                                                                dropdownItem.label
                                                                            }
                                                                        </span>
                                                                        {dropdownItem.description && (
                                                                            <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                                {
                                                                                    dropdownItem.description
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </Link>
                                                                )
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    }

                                    const isActive = isNavItemActive(item.href)
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) =>
                                                handleClick(e, item.href)
                                            }
                                            className={`relative py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
                                                isActive
                                                    ? 'text-black dark:text-white bg-black/[0.03] dark:bg-white/[0.03]'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                                            }`}
                                        >
                                            {item.label}
                                            {isActive && (
                                                <motion.span
                                                    layoutId="activePill"
                                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 -z-10"
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 380,
                                                        damping: 30,
                                                    }}
                                                />
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href="/resume"
                                    className="hidden md:inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 dark:text-black rounded-full hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Resume
                                </Link>
                                <DarkModeToggle />

                                <button
                                    onClick={() =>
                                        setIsMobileMenuOpen(!isMobileMenuOpen)
                                    }
                                    className="md:hidden p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="sr-only">
                                        {isMobileMenuOpen
                                            ? 'Close menu'
                                            : 'Open menu'}
                                    </span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={
                                                isMobileMenuOpen
                                                    ? 'M6 18L18 6M6 6l12 12'
                                                    : 'M4 6h16M4 12h16M4 18h16'
                                            }
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                transition: {
                                    height: { duration: 0.4 },
                                    opacity: { duration: 0.25, delay: 0.15 },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                    height: { duration: 0.3 },
                                    opacity: { duration: 0.2 },
                                },
                            }}
                            className="md:hidden overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/10 dark:border-gray-800/10"
                        >
                            <motion.div
                                variants={{
                                    open: {
                                        transition: {
                                            staggerChildren: 0.07,
                                            delayChildren: 0.2,
                                        },
                                    },
                                    closed: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            staggerDirection: -1,
                                        },
                                    },
                                }}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="px-6 py-4 space-y-3"
                            >
                                {/* Mobile menu items with updated styling */}
                                {navItems.map((item) => {
                                    if ('dropdownItems' in item) {
                                        return (
                                            <motion.div
                                                key={item.label}
                                                variants={{
                                                    open: {
                                                        y: 0,
                                                        opacity: 1,
                                                        transition: {
                                                            y: {
                                                                stiffness: 1000,
                                                                velocity: -100,
                                                            },
                                                        },
                                                    },
                                                    closed: {
                                                        y: 50,
                                                        opacity: 0,
                                                        transition: {
                                                            y: {
                                                                stiffness: 1000,
                                                            },
                                                        },
                                                    },
                                                }}
                                                className="space-y-2"
                                            >
                                                <div className="font-medium px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                                                    {item.label}
                                                </div>
                                                <div className="pl-4 space-y-2">
                                                    {item.dropdownItems.map(
                                                        (dropdownItem) => (
                                                            <Link
                                                                key={
                                                                    dropdownItem.href
                                                                }
                                                                href={
                                                                    dropdownItem.href
                                                                }
                                                                className="block py-2 px-4 text-sm rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                                                                onClick={() => {
                                                                    handleClick(
                                                                        null,
                                                                        dropdownItem.href
                                                                    )
                                                                    setIsMobileMenuOpen(
                                                                        false
                                                                    )
                                                                }}
                                                            >
                                                                {
                                                                    dropdownItem.label
                                                                }
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </motion.div>
                                        )
                                    }

                                    const isActive = isNavItemActive(item.href)
                                    return (
                                        <motion.div
                                            key={item.href}
                                            variants={{
                                                open: {
                                                    y: 0,
                                                    opacity: 1,
                                                    transition: {
                                                        y: {
                                                            stiffness: 1000,
                                                            velocity: -100,
                                                        },
                                                    },
                                                },
                                                closed: {
                                                    y: 50,
                                                    opacity: 0,
                                                    transition: {
                                                        y: { stiffness: 1000 },
                                                    },
                                                },
                                            }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={(e) => {
                                                    handleClick(e, item.href)
                                                    setIsMobileMenuOpen(false)
                                                }}
                                                className={`block py-2 px-4 text-sm rounded-full transition-all duration-200 ${
                                                    isActive
                                                        ? 'bg-gray-100/50 dark:bg-gray-800/50 font-medium'
                                                        : 'hover:bg-gray-100/30 dark:hover:bg-gray-800/30'
                                                }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                                <motion.div
                                    variants={{
                                        open: {
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                                y: {
                                                    stiffness: 1000,
                                                    velocity: -100,
                                                },
                                            },
                                        },
                                        closed: {
                                            y: 50,
                                            opacity: 0,
                                            transition: {
                                                y: { stiffness: 1000 },
                                            },
                                        },
                                    }}
                                >
                                    <Link
                                        href="/resume"
                                        className="block py-2 px-4 text-sm font-medium text-center text-white bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 dark:text-black rounded-full hover:opacity-90 transition-all duration-200 hover:scale-[1.02]"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Resume
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </header>
    )
}
