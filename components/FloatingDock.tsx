'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function FloatingDock() {
    const pathname = usePathname()

    const navItems = [
        { href: '/', icon: '⌂', label: 'Home' },
        { href: '/projects', icon: '⚡', label: 'Work' },
        { href: '#about', icon: '◆', label: 'About' },
        { href: '#contact', icon: '✉', label: 'Contact' },
    ]

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-black/80 backdrop-blur-lg dark:bg-white/10 rounded-full shadow-lg px-8 py-4"
            >
                <div className="flex items-center space-x-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative"
                        >
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-xl text-white dark:text-white/90">
                                    {item.icon}
                                </span>
                                <span className="absolute -bottom-4 text-[10px] font-medium text-white/0 group-hover:text-white/90 transition-all">
                                    {item.label}
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

// Also export as default for backward compatibility
export default FloatingDock
