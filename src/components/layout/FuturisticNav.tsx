'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Contact', path: '/#contact' },
]

export function FuturisticNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                className="glass-effect px-4 py-2 rounded-full flex gap-2"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.path
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`px-4 py-2 rounded-full transition-colors relative ${
                                isActive
                                    ? 'text-white'
                                    : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full -z-10"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 20,
                                    }}
                                />
                            )}
                            {item.name}
                        </Link>
                    )
                })}
            </motion.div>
        </nav>
    )
}
