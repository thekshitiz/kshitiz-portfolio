'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { posts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const ITEMS_PER_PAGE = 6

export function BlogContent() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

    // Get unique categories from all posts
    const allCategories = useMemo(
        () =>
            Array.from(
                new Set(posts.flatMap((post) => post.categories))
            ).sort(),
        []
    )

    // Filter and sort posts
    const filteredPosts = useMemo(() => {
        const filtered = posts.filter((post) => {
            const searchContent = `${post.title} ${post.excerpt}`.toLowerCase()
            const matchesSearch = searchContent.includes(
                searchTerm.toLowerCase()
            )
            const matchesCategory =
                selectedCategory === 'All' ||
                post.categories.includes(selectedCategory)
            return matchesSearch && matchesCategory
        })

        return [...filtered].sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title)
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
    }, [searchTerm, selectedCategory, sortBy])

    // Paginate posts
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header Section */}
            <section className="relative py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Blog & Tutorials
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            In-depth articles, tutorials, and guides about web
                            development, programming best practices, and
                            software engineering.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <div className="sticky top-20 z-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-4 w-full md:w-auto">
                            <select
                                className="p-2 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                            >
                                <option value="All">All Categories</option>
                                {allCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="p-2 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(
                                        e.target.value as 'date' | 'title'
                                    )
                                }
                            >
                                <option value="date">Most Recent</option>
                                <option value="title">Alphabetical</option>
                            </select>
                        </div>

                        <div className="relative w-full md:w-64">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPosts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No posts found matching your criteria.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`
                                    px-4 py-2 rounded-md transition-colors
                                    ${
                                        currentPage === i + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }
                                `}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
