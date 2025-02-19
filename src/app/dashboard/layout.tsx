'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    HomeIcon,
    DocumentTextIcon,
    FolderIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: HomeIcon },
    { name: 'Blog Posts', href: '/dashboard/blogs', icon: DocumentTextIcon },
    { name: 'Portfolio', href: '/dashboard/portfolio', icon: FolderIcon },
    {
        name: 'Testimonials',
        href: '/dashboard/testimonials',
        icon: ChatBubbleLeftRightIcon,
    },
    { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -280 }}
                animate={{ x: sidebarOpen ? 0 : -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0"
            >
                <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                    <Link
                        href="/dashboard"
                        className="text-xl font-semibold text-gray-900 dark:text-white"
                    >
                        Dashboard
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                <item.icon
                                    className={`mr-3 h-5 w-5 ${
                                        isActive
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-400 dark:text-gray-500'
                                    }`}
                                />
                                {item.name}
                            </Link>
                        )
                    })}

                    <button
                        onClick={() => {
                            // Add logout logic here
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </nav>
            </motion.aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Navigation */}
                <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex h-16 items-center justify-between px-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden"
                        >
                            <Bars3Icon className="h-6 w-6 text-gray-500" />
                        </button>

                        {/* Profile Dropdown (to be implemented) */}
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4">{children}</main>
            </div>
        </div>
    )
}
