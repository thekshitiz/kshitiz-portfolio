'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative bg-gradient-to-b from-black to-gray-900 text-white pt-24 pb-12 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
            </div>

            {/* Main Footer Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Branding Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <Link
                            href="/"
                            className="text-2xl font-bold tracking-tighter hover:text-gray-300 transition-colors"
                        >
                            Kshitiz
                        </Link>
                        <p className="text-gray-400 max-w-xs">
                            Crafting digital experiences that leave a lasting
                            impression.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="w-6 h-6" />
                                    <span className="sr-only">
                                        {social.name}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-semibold mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link, index) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold mb-6">
                            Get in Touch
                        </h3>
                        <ul className="space-y-4 text-gray-400">
                            <motion.li whileHover={{ x: 2 }}>
                                <a
                                    href="mailto:thekshitizrai@gmail.com"
                                    className="hover:text-white transition-colors inline-flex items-center"
                                >
                                    <span className="mr-2">📧</span>
                                    thekshitizrai@gmail.com
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ x: 2 }}>
                                <a
                                    href="tel:+977-9818180198"
                                    className="hover:text-white transition-colors inline-flex items-center"
                                >
                                    <span className="mr-2">📱</span>
                                    +977-9818180198
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ x: 2 }}>
                                <span className="inline-flex items-center">
                                    <span className="mr-2">📍</span>
                                    Triyuga-10
                                    <br />
                                    <span className="ml-6">
                                        Udayapur, Nepal
                                    </span>
                                </span>
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-semibold mb-6">
                            Stay Updated
                        </h3>
                        <form
                            className="space-y-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <p className="text-gray-400">
                                Subscribe to my newsletter for the latest
                                updates.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <motion.button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Join
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="pt-8 mt-8 border-t border-gray-800"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Kshitiz. All rights
                            reserved.
                        </p>
                        <div className="flex items-center space-x-6 mt-4 md:mt-0">
                            <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <motion.button
                                onClick={scrollToTop}
                                className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                <span className="text-sm">Back to top</span>
                                <ArrowUpIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/yourusername',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/in/yourusername',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/yourusername',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: 'https://instagram.com/yourusername',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
    {
        name: 'YouTube',
        href: 'https://youtube.com/@yourusername',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    },
    {
        name: 'Website',
        href: 'https://yourwebsite.com',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
        ),
    },
]

const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
]
