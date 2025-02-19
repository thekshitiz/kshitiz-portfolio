'use client'

import { useState, useEffect } from 'react'
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
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { format } from 'date-fns'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

interface DashboardStats {
    overview: {
        totalPosts: number
        totalViews: number
        totalComments: number
        engagement: number
        growth: number
    }
    recentActivity: {
        posts: Array<{
            id: string
            title: string
            views: number
            likes: number
            createdAt: string
        }>
        comments: Array<{
            id: string
            content: string
            author: string
            postTitle: string
            createdAt: string
        }>
    }
    analytics: {
        views: number[]
        engagement: number[]
        dates: string[]
    }
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Fetch dashboard data
        const fetchData = async () => {
            try {
                // Simulated data for now
                const mockData: DashboardStats = {
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
                            // Add more mock posts...
                        ],
                        comments: [],
                    },
                    analytics: {
                        dates: Array.from({ length: 7 }, (_, i) =>
                            format(
                                new Date(Date.now() - i * 24 * 60 * 60 * 1000),
                                'MMM dd'
                            )
                        ).reverse(),
                        views: [1200, 1900, 2100, 2500, 2200, 2800, 3100],
                        engagement: [65, 72, 68, 75, 70, 78, 82],
                    },
                }
                setStats(mockData)
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const StatCard = ({
        title,
        value,
        change,
        icon: Icon,
        trend = 'up',
    }: {
        title: string
        value: string | number
        change: string
        icon: any
        trend?: 'up' | 'down'
    }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </h3>
                </div>
                <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        trend === 'up'
                            ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
                            : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
                    }`}
                >
                    {trend === 'up' ? (
                        <ArrowUpIcon className="w-3 h-3 mr-1" />
                    ) : (
                        <ArrowDownIcon className="w-3 h-3 mr-1" />
                    )}
                    {change}
                </span>
            </div>
            <div className="mt-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
            </div>
        </motion.div>
    )

    const RecentActivity = () => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Recent Activity
            </h3>
            <div className="space-y-4">
                {stats?.recentActivity.posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg shrink-0">
                            <DocumentTextIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {post.title}
                            </p>
                            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center">
                                    <EyeIcon className="w-4 h-4 mr-1" />
                                    {post.views}
                                </span>
                                <span>•</span>
                                <span className="flex items-center">
                                    <HeartIcon className="w-4 h-4 mr-1" />
                                    {post.likes}
                                </span>
                                <span>•</span>
                                <span className="flex items-center">
                                    <ClockIcon className="w-4 h-4 mr-1" />
                                    {format(
                                        new Date(post.createdAt),
                                        'MMM d, yyyy'
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const AnalyticsChart = () => {
        const chartData = {
            labels: stats?.analytics.dates || [],
            datasets: [
                {
                    label: 'Views',
                    data: stats?.analytics.views || [],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Engagement',
                    data: stats?.analytics.engagement || [],
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                },
            ],
        }

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top' as const,
                    labels: {
                        color: 'rgb(156, 163, 175)',
                        font: {
                            size: 12,
                        },
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: 'rgb(156, 163, 175)',
                    },
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(156, 163, 175, 0.1)',
                    },
                    ticks: {
                        color: 'rgb(156, 163, 175)',
                    },
                },
            },
            interaction: {
                intersect: false,
                mode: 'index' as const,
            },
        }

        if (isLoading) {
            return (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
                    </div>
                </div>
            )
        }

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Analytics Overview
                </h3>
                <div className="h-[300px]">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Posts"
                    value={stats?.overview.totalPosts || 0}
                    change="+12.5%"
                    icon={DocumentTextIcon}
                />
                <StatCard
                    title="Total Views"
                    value={stats?.overview.totalViews || 0}
                    change="+8.2%"
                    icon={EyeIcon}
                />
                <StatCard
                    title="Comments"
                    value={stats?.overview.totalComments || 0}
                    change="-2.4%"
                    icon={ChatBubbleLeftIcon}
                    trend="down"
                />
                <StatCard
                    title="Engagement"
                    value={`${stats?.overview.engagement || 0}%`}
                    change="+5.7%"
                    icon={ArrowTrendingUpIcon}
                />
            </div>

            {/* Analytics Chart */}
            <AnalyticsChart />

            {/* Recent Activity */}
            <RecentActivity />
        </div>
    )
}
