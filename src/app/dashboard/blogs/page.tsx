'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
} from '@heroicons/react/24/outline'

interface Blog {
    id: string
    title: string
    excerpt: string
    status: 'draft' | 'published'
    publishedAt: string
    views: number
}

const mockBlogs: Blog[] = [
    {
        id: '1',
        title: 'Getting Started with Next.js 14',
        excerpt:
            'Learn how to build modern web applications with Next.js 14...',
        status: 'published',
        publishedAt: '2024-02-20',
        views: 1234,
    },
    {
        id: '2',
        title: 'Understanding TypeScript Generics',
        excerpt:
            'Deep dive into TypeScript generics and their practical uses...',
        status: 'draft',
        publishedAt: '',
        views: 0,
    },
]

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>(mockBlogs)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Blog Posts
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your blog posts and drafts
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    New Post
                </motion.button>
            </div>

            {/* Blog List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Published
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Views
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {blogs.map((blog) => (
                                <motion.tr
                                    key={blog.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {blog.title}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {blog.excerpt}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                blog.status === 'published'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                            }`}
                                        >
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {blog.publishedAt || 'Not published'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {blog.views.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    /* View logic */
                                                }}
                                                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setSelectedBlog(blog)
                                                }
                                                className="text-blue-400 hover:text-blue-500"
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    /* Delete logic */
                                                }}
                                                className="text-red-400 hover:text-red-500"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {blogs.length} of {blogs.length} posts
                </div>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
