'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
    ChartBarIcon,
    DocumentTextIcon,
    ChatBubbleLeftIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline'

interface DashboardStats {
    totalPosts: number
    totalComments: number
    totalUsers: number
    viewsToday: number
    viewsThisMonth: number
}

interface Post {
    id: string
    title: string
    published: boolean
    createdAt: string
    author: {
        name: string
    }
}

interface Comment {
    id: string
    content: string
    approved: boolean
    createdAt: string
    author: {
        name: string
    }
    post: {
        title: string
    }
}

export default function AdminDashboard() {
    const { data: session } = useSession()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [posts, setPosts] = useState<Post[]>([])
    const [comments, setComments] = useState<Comment[]>([])
    const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, postsRes, commentsRes] = await Promise.all([
                    fetch('/api/admin/stats'),
                    fetch('/api/admin/posts'),
                    fetch('/api/admin/comments'),
                ])

                if (!statsRes.ok || !postsRes.ok || !commentsRes.ok) {
                    throw new Error('Failed to fetch dashboard data')
                }

                const [statsData, postsData, commentsData] = await Promise.all([
                    statsRes.json(),
                    postsRes.json(),
                    commentsRes.json(),
                ])

                setStats(statsData)
                setPosts(postsData.posts)
                setComments(commentsData.comments)
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    const handlePostPublish = async (postId: string, published: boolean) => {
        try {
            const response = await fetch(`/api/admin/posts/${postId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ published }),
            })

            if (!response.ok) throw new Error('Failed to update post')

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? { ...post, published } : post
                )
            )
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    const handleCommentApproval = async (
        commentId: string,
        approved: boolean
    ) => {
        try {
            const response = await fetch(`/api/admin/comments/${commentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ approved }),
            })

            if (!response.ok) throw new Error('Failed to update comment')

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId
                        ? { ...comment, approved }
                        : comment
                )
            )
        } catch (error) {
            console.error('Error updating comment:', error)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-gray-900 dark:text-white"
                    >
                        Welcome back, {session?.user?.name}
                    </motion.h1>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Total Posts
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                {stats?.totalPosts}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <ChatBubbleLeftIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Total Comments
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                {stats?.totalComments}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <UserGroupIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Total Users
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                {stats?.totalUsers}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <ChartBarIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Views Today
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                {stats?.viewsToday}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tabs */}
                    <div className="mt-8">
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="-mb-px flex">
                                <button
                                    onClick={() => setActiveTab('posts')}
                                    className={`${
                                        activeTab === 'posts'
                                            ? 'border-black dark:border-white text-black dark:text-white'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                                    } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                                >
                                    Posts
                                </button>
                                <button
                                    onClick={() => setActiveTab('comments')}
                                    className={`${
                                        activeTab === 'comments'
                                            ? 'border-black dark:border-white text-black dark:text-white'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                                    } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                                >
                                    Comments
                                </button>
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="mt-8">
                            {activeTab === 'posts' ? (
                                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {posts.map((post) => (
                                            <li key={post.id}>
                                                <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                            {post.title}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                            By{' '}
                                                            {post.author.name}{' '}
                                                            on{' '}
                                                            {new Date(
                                                                post.createdAt
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0">
                                                        <button
                                                            onClick={() =>
                                                                handlePostPublish(
                                                                    post.id,
                                                                    !post.published
                                                                )
                                                            }
                                                            className={`${
                                                                post.published
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                                            } px-2 py-1 text-xs font-medium rounded-full`}
                                                        >
                                                            {post.published
                                                                ? 'Published'
                                                                : 'Draft'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {comments.map((comment) => (
                                            <li key={comment.id}>
                                                <div className="px-4 py-4 sm:px-6">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                            {
                                                                comment.author
                                                                    .name
                                                            }{' '}
                                                            on{' '}
                                                            {comment.post.title}
                                                        </p>
                                                        <div className="ml-2 flex-shrink-0 flex">
                                                            <button
                                                                onClick={() =>
                                                                    handleCommentApproval(
                                                                        comment.id,
                                                                        !comment.approved
                                                                    )
                                                                }
                                                                className={`${
                                                                    comment.approved
                                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                                } px-2 py-1 text-xs font-medium rounded-full`}
                                                            >
                                                                {comment.approved
                                                                    ? 'Approved'
                                                                    : 'Pending'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 sm:flex sm:justify-between">
                                                        <div className="sm:flex">
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {
                                                                    comment.content
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                                            <p>
                                                                {new Date(
                                                                    comment.createdAt
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
