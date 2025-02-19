'use client'

import { motion } from 'framer-motion'
import {
    DocumentTextIcon,
    FolderIcon,
    ChatBubbleLeftRightIcon,
    EyeIcon,
} from '@heroicons/react/24/outline'

const stats = [
    {
        name: 'Total Blog Posts',
        value: '12',
        icon: DocumentTextIcon,
        change: '+2 this week',
        changeType: 'increase',
    },
    {
        name: 'Portfolio Projects',
        value: '8',
        icon: FolderIcon,
        change: '+1 this month',
        changeType: 'increase',
    },
    {
        name: 'Testimonials',
        value: '24',
        icon: ChatBubbleLeftRightIcon,
        change: '+3 this month',
        changeType: 'increase',
    },
    {
        name: 'Total Views',
        value: '1,234',
        icon: EyeIcon,
        change: '+201 this week',
        changeType: 'increase',
    },
]

const recentActivity = [
    {
        id: 1,
        type: 'blog',
        title: 'Getting Started with Next.js 14',
        action: 'Published',
        timestamp: '2 hours ago',
    },
    {
        id: 2,
        type: 'portfolio',
        title: 'E-commerce Dashboard',
        action: 'Updated',
        timestamp: '5 hours ago',
    },
    {
        id: 3,
        type: 'testimonial',
        title: 'John Doe',
        action: 'Added',
        timestamp: '1 day ago',
    },
]

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Dashboard Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Welcome back! Here's what's happening with your site.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
                    >
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {stat.name}
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                        <p
                            className={`mt-2 text-sm ${
                                stat.changeType === 'increase'
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                            }`}
                        >
                            {stat.change}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                </h2>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {activity.title}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {activity.action} • {activity.timestamp}
                                </p>
                            </div>
                            <span className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
                                {activity.type}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
