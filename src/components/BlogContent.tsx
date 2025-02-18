'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { posts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'

const ITEMS_PER_PAGE = 6

export function BlogContent() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

    const allCategories = useMemo(
        () =>
            Array.from(
                new Set(posts.flatMap((post) => post.categories))
            ).sort(),
        []
    )

    const filteredPosts = useMemo(() => {
        const filtered = posts.filter((post) => {
            const searchContent = `${post.title} ${post.excerpt}`.toLowerCase()
            const matchesSearch = searchContent.includes(
                searchTerm.toLowerCase()
            )
            const matchesCategory =
                !selectedCategory || post.categories.includes(selectedCategory)
            return matchesSearch && matchesCategory
        })

        if (sortBy === 'title') {
            return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
        } else {
            return [...filtered].sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            )
        }
    }, [searchTerm, selectedCategory, sortBy])

    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8"
                >
                    Blog
                </motion.h1>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="flex-1 p-2 border rounded-md dark:bg-gray-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="p-2 border rounded-md dark:bg-gray-800"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {allCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <select
                        className="p-2 border rounded-md dark:bg-gray-800"
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value as 'date' | 'title')
                        }
                    >
                        <option value="date">Most Recent</option>
                        <option value="title">Alphabetical</option>
                    </select>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedPosts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === i + 1
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
