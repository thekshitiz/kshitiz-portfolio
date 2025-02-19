'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    ChartBarIcon,
    DocumentTextIcon,
    ChatBubbleLeftIcon,
    EnvelopeIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusCircleIcon,
    PencilSquareIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline'

const menuItems = [
    {
        name: 'Dashboard',
        href: '/admin',
        icon: ChartBarIcon,
    },
    {
        name: 'Blog Posts',
        href: '/admin/posts',
        icon: DocumentTextIcon,
    },
    {
        name: 'Comments',
        href: '/admin/comments',
        icon: ChatBubbleLeftIcon,
    },
    {
        name: 'Messages',
        href: '/admin/messages',
        icon: EnvelopeIcon,
    },
    {
        name: 'Users',
        href: '/admin/users',
        icon: UserGroupIcon,
    },
    {
        name: 'Settings',
        href: '/admin/settings',
        icon: Cog6ToothIcon,
    },
]

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            setIsMobile(width < 1024)
            setSidebarOpen(width >= 1024)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
            </div>
        )
    }

    if (!session?.user?.role || session.user.role !== 'ADMIN') {
        router.push('/auth/signin')
        return null
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 transform transition-all duration-300 
                    ${
                        sidebarOpen
                            ? 'translate-x-0 w-64'
                            : '-translate-x-full lg:translate-x-0 lg:w-20'
                    }`}
            >
                {/* Sidebar Header */}
                <div className="h-16 px-4 flex items-center justify-between border-b dark:border-gray-700">
                    <h1
                        className={`text-xl font-bold text-gray-900 dark:text-white transition-opacity duration-300
                            ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}
                    >
                        Admin Panel
                    </h1>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {sidebarOpen ? (
                            <ChevronLeftIcon className="w-5 h-5" />
                        ) : (
                            <ChevronRightIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-4 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-2 py-2 mt-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            <span
                                className={`ml-3 transition-opacity duration-300
                                    ${
                                        sidebarOpen
                                            ? 'opacity-100'
                                            : 'opacity-0 lg:hidden'
                                    }`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Sign Out Button */}
                <div className="p-4 border-t dark:border-gray-700">
                    <button
                        onClick={() => router.push('/api/auth/signout')}
                        className="flex items-center w-full px-2 py-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 shrink-0" />
                        <span
                            className={`ml-3 transition-opacity duration-300
                                ${
                                    sidebarOpen
                                        ? 'opacity-100'
                                        : 'opacity-0 lg:hidden'
                                }`}
                        >
                            Sign Out
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div
                className={`flex flex-col min-h-screen ${
                    sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
                }`}
            >
                {/* Header */}
                <header className="fixed top-0 right-0 left-0 lg:left-64 z-20 h-16 bg-white dark:bg-gray-800 shadow transition-all duration-300">
                    <div className="flex items-center justify-between h-full px-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-md lg:hidden"
                        >
                            ☰
                        </button>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                {session.user.email}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Main Content - Add padding bottom to account for footer height */}
                <main className="flex-1 pt-16 pb-24 px-4">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>

                {/* Footer - Fixed at bottom */}
                <footer className="fixed bottom-0 right-0 left-0 lg:left-64 z-20 bg-white dark:bg-gray-800 border-t dark:border-gray-700 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    © {new Date().getFullYear()} Your Blog Name
                                </span>
                                <span className="text-gray-300 dark:text-gray-600">
                                    |
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Version 1.0.0
                                </span>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() =>
                                        router.push('/admin/posts/new')
                                    }
                                    className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                >
                                    <PlusCircleIcon className="w-4 h-4 mr-1" />
                                    New Post
                                </button>
                                <button
                                    onClick={() => router.push('/admin/drafts')}
                                    className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400"
                                >
                                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                                    Drafts
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400"
                                >
                                    <ArrowPathIcon className="w-4 h-4 mr-1" />
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
