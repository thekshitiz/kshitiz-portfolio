'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import DarkModeToggle from './DarkModeToggle'

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
        <header className="fixed top-0 left-0 right-0 z-[100] bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200/10 dark:border-gray-800/10 supports-[backdrop-filter]:bg-white/50 supports-[backdrop-filter]:dark:bg-gray-900/50">
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                }}
            >
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
                        >
                            Kshitiz
                        </Link>

                        <div className="flex items-center gap-8">
                            <div className="hidden md:flex items-center gap-6">
                                {navItems.map((item) => {
                                    if ('dropdownItems' in item) {
                                        return (
                                            <div
                                                key={item.label}
                                                className="relative"
                                                onMouseEnter={() =>
                                                    setOpenDropdown(item.label)
                                                }
                                                onMouseLeave={() =>
                                                    setOpenDropdown(null)
                                                }
                                            >
                                                <button className="flex items-center gap-1 py-1.5 px-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                                    {item.label}
                                                    <ChevronDownIcon className="w-4 h-4" />
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
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                            className="absolute top-full -left-2 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2"
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
                                                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                    >
                                                                        <span className="block font-medium">
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
                                            className={`relative py-1.5 px-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors ${
                                                isActive
                                                    ? 'text-black dark:text-white'
                                                    : ''
                                            }`}
                                        >
                                            {item.label}
                                            {isActive && (
                                                <>
                                                    <motion.span
                                                        layoutId="activeSection"
                                                        className="absolute inset-0 bg-black/[0.03] dark:bg-white/[0.03] rounded-lg"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 380,
                                                            damping: 30,
                                                        }}
                                                    />
                                                    <motion.span
                                                        layoutId="activePill"
                                                        className="absolute -bottom-px left-0 right-0 h-0.5 bg-black dark:bg-white"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 380,
                                                            damping: 30,
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href="/resume"
                                    className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Resume
                                </Link>
                                <DarkModeToggle />
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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
                </nav>

                {/* Mobile Menu with improved animation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                transition: {
                                    height: {
                                        duration: 0.4,
                                        ease: [0.4, 0, 0.2, 1],
                                    },
                                    opacity: {
                                        duration: 0.25,
                                        delay: 0.15,
                                    },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                    height: {
                                        duration: 0.3,
                                        ease: [0.4, 0, 0.2, 1],
                                    },
                                    opacity: {
                                        duration: 0.2,
                                    },
                                },
                            }}
                            className="md:hidden overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/10 dark:border-gray-800/10"
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
                                {navItems.map((item, i) => {
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
                                                <div className="font-medium px-4 py-2">
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
                                                                className="block py-2 px-4 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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
                                                className={`block py-2 px-4 text-sm rounded-lg transition-all duration-200 ${
                                                    isActive
                                                        ? 'bg-black/[0.03] dark:bg-white/[0.03] font-medium scale-[1.02]'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02]'
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
                                        className="block py-2 px-4 text-sm font-medium text-center text-white bg-black dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-[1.02]"
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
