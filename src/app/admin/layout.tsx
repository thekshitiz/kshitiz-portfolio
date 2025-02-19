'use client'

import { useState } from 'react'
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

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(true)

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
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-200 ease-in-out`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            Admin Panel
                        </h1>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 rounded-md lg:hidden"
                        >
                            ×
                        </button>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center px-2 py-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => router.push('/api/auth/signout')}
                            className="flex items-center w-full px-2 py-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                            Sign Out
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div
                className={`${
                    sidebarOpen ? 'lg:ml-64' : ''
                } min-h-screen transition-all duration-200`}
            >
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="flex items-center justify-between h-16 px-4">
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
                <main className="p-4">{children}</main>
            </div>
        </div>
    )
}
