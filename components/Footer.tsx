'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-12 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-2xl font-bold text-gray-900 dark:text-white"
                        >
                            Kshitiz
                        </motion.div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                            Creating digital experiences that inspire and
                            innovate.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {['About', 'Projects', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`#${item.toLowerCase()}`}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Connect
                        </h3>
                        <div className="flex space-x-4">
                            {[
                                { name: 'GitHub', href: '#' },
                                { name: 'LinkedIn', href: '#' },
                                { name: 'Twitter', href: '#' },
                            ].map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    whileHover={{ y: -2 }}
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    {social.name}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                        © {currentYear} Kshitiz. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
