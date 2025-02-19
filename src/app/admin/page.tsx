'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    UsersIcon,
    DocumentTextIcon,
    ChatBubbleLeftIcon,
    EnvelopeIcon,
    ChartBarIcon,
    EyeIcon,
    HeartIcon,
    ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface DashboardStats {
    stats: {
        totalUsers: number
        totalPosts: number
        totalComments: number
        totalMessages: number
        totalViews: number
        totalLikes: number
        growthRate: number
    }
    recentMessages: Array<{
        id: string
        name: string
        email: string
        subject: string
        message: string
        createdAt: string
        status: string
    }>
    recentPosts: Array<{
        id: string
        title: string
        author: string
        views: number
        likes: number
        createdAt: string
    }>
    analytics: {
        views: number[]
        likes: number[]
        comments: number[]
        dates: string[]
    }
}

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>(
        'week'
    )

    const chartData = {
        labels: data?.analytics.dates || [],
        datasets: [
            {
                label: 'Views',
                data: data?.analytics.views || [],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
            {
                label: 'Likes',
                data: data?.analytics.likes || [],
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
            },
            {
                label: 'Comments',
                data: data?.analytics.comments || [],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Blog Performance',
            },
        },
    }

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const response = await fetch('/api/admin/dashboard')
                const data = await response.json()
                setData(data)
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                Failed to load dashboard data
            </div>
        )
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Dashboard Overview
                </h1>
                <div className="flex gap-2">
                    {['week', 'month', 'year'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setTimeframe(period as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                timeframe === period
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                            }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Views"
                    value={data?.stats.totalViews || 0}
                    change="+12.5%"
                    icon={EyeIcon}
                    color="blue"
                />
                <StatCard
                    title="Total Likes"
                    value={data?.stats.totalLikes || 0}
                    change="+8.2%"
                    icon={HeartIcon}
                    color="red"
                />
                <StatCard
                    title="Total Posts"
                    value={data?.stats.totalPosts || 0}
                    change="+5.7%"
                    icon={DocumentTextIcon}
                    color="green"
                />
                <StatCard
                    title="Growth Rate"
                    value={`${data?.stats.growthRate || 0}%`}
                    change="+2.3%"
                    icon={ArrowTrendingUpIcon}
                    color="purple"
                />
            </div>

            {/* Analytics Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <Line options={chartOptions} data={chartData} />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentPosts posts={data?.recentPosts || []} />
                <RecentMessages messages={data?.recentMessages || []} />
            </div>
        </div>
    )
}

function StatCard({
    title,
    value,
    change,
    icon: Icon,
    color,
}: {
    title: string
    value: number
    change: string
    icon: any
    color: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
            <div className="flex items-center">
                <div
                    className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}
                >
                    <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                    <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </h2>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {value.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{change}</p>
                </div>
            </div>
        </motion.div>
    )
}

function RecentMessages({ messages }: { messages: any[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Messages
            </h2>
            {messages.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                    No recent messages
                </p>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className="flex items-start justify-between"
                        >
                            <div>
                                <p className="text-sm text-gray-900 dark:text-white">
                                    {message.content}
                                </p>
                                <p className="text-sm text-gray-500">
                                    from {message.name}
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(
                                    message.createdAt
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function RecentPosts({ posts }: { posts: any[] }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Posts
            </h2>
            {posts.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                    No recent posts
                </p>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    by {post.author}
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
