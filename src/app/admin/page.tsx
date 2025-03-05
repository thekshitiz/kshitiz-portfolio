'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    UsersIcon,
    DocumentTextIcon,
    ChatBubbleLeftIcon,
    EyeIcon,
    HeartIcon,
    ArrowTrendingUpIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    ClockIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'

interface StatCardProps {
    title: string
    value: number | string
    change: string
    icon: any
    trend?: 'up' | 'down'
}

function StatCard({
    title,
    value,
    change,
    icon: Icon,
    trend = 'up',
}: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
            </div>
            <div className="mt-4 flex items-center">
                {trend === 'up' ? (
                    <ArrowUpIcon className="w-4 h-4 text-green-500" />
                ) : (
                    <ArrowDownIcon className="w-4 h-4 text-red-500" />
                )}
                <span
                    className={`ml-2 text-sm ${
                        trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {change}
                </span>
            </div>
        </motion.div>
    )
}

export default function AdminDashboard() {
    const [stats] = useState({
        overview: {
            totalPosts: 125,
            totalViews: 45892,
            totalComments: 2341,
            engagement: 67,
            growth: 12.5,
        },
        recentActivity: {
            posts: [
                {
                    id: '1',
                    title: 'Getting Started with Next.js',
                    views: 1234,
                    likes: 89,
                    createdAt: new Date().toISOString(),
                },
            ],
            comments: [] as any[],
        },
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Posts"
                    value={stats.overview.totalPosts}
                    change="+12.5%"
                    icon={DocumentTextIcon}
                />
                <StatCard
                    title="Total Views"
                    value={stats.overview.totalViews}
                    change="+8.2%"
                    icon={EyeIcon}
                />
                <StatCard
                    title="Comments"
                    value={stats.overview.totalComments}
                    change="-2.4%"
                    icon={ChatBubbleLeftIcon}
                    trend="down"
                />
                <StatCard
                    title="Engagement"
                    value={`${stats.overview.engagement}%`}
                    change="+5.7%"
                    icon={ArrowTrendingUpIcon}
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {stats.recentActivity.posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                            <div>
                                <h3 className="font-medium">{post.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {format(
                                        new Date(post.createdAt),
                                        'MMM dd, yyyy'
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center text-gray-600 dark:text-gray-300">
                                    <EyeIcon className="w-4 h-4 mr-1" />
                                    {post.views}
                                </span>
                                <span className="flex items-center text-gray-600 dark:text-gray-300">
                                    <HeartIcon className="w-4 h-4 mr-1" />
                                    {post.likes}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
