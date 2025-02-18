'use client'

import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            About
                        </h3>
                        <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                            A passionate developer creating amazing digital experiences.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            Navigation
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    href="/"
                                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/projects"
                                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#contact"
                                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            Social
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a
                                    href="https://github.com/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/in/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            Contact
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li className="text-base text-gray-500 dark:text-gray-400">
                                Email: your.email@example.com
                            </li>
                            <li className="text-base text-gray-500 dark:text-gray-400">
                                Location: Your City, Country
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        © {new Date().getFullYear()} Your Name. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
} 