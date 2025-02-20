'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FolderOpen, User, Mail } from 'lucide-react'

const dockItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'About', href: '/about', icon: User },
    { name: 'Contact', href: '/contact', icon: Mail },
]

export function FloatingDock() {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setIsVisible(
                currentScrollY < lastScrollY || // Scrolling up
                    currentScrollY < 100 || // Near the top
                    currentScrollY + window.innerHeight >=
                        document.body.scrollHeight - 100 // Near the bottom
            )
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{
                y: isVisible ? 0 : 100,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl shadow-lg border border-gray-200/50 dark:border-gray-800/50">
                {dockItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    const isHovered = hoveredItem === item.name

                    return (
                        <Link key={item.name} href={item.href}>
                            <motion.div
                                onHoverStart={() => setHoveredItem(item.name)}
                                onHoverEnd={() => setHoveredItem(null)}
                                className="relative group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-2.5 rounded-xl transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.div>

                                {/* Tooltip */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 text-sm font-medium text-white bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg whitespace-nowrap"
                                        >
                                            {item.name}
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Active Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    )
                })}
            </div>
        </motion.div>
    )
}
