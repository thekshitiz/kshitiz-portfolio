'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'
import { generateMetadata } from '@/lib/metadata'

const ITEMS_PER_PAGE = 6

export const metadata = generateMetadata({
    title: 'Projects | Your Name',
    description: 'Explore my portfolio of projects and work.',
})

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTag, setSelectedTag] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState<'title' | 'recent'>('recent')
    const [isLoading, setIsLoading] = useState(false)

    // Memoize allTags
    const allTags = useMemo(
        () =>
            Array.from(
                new Set(projects.flatMap((project) => project.tags))
            ).sort(),
        []
    )

    // Memoize filtered and sorted projects
    const filteredProjects = useMemo(() => {
        const filtered = projects.filter((project) => {
            const searchContent =
                `${project.title} ${project.description}`.toLowerCase()
            const matchesSearch = searchContent.includes(
                searchTerm.toLowerCase()
            )
            const matchesTag =
                !selectedTag || project.tags.includes(selectedTag)
            return matchesSearch && matchesTag
        })

        // Sort projects
        if (sortBy === 'title') {
            return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
        } else {
            return [...filtered].sort((a, b) => b.id - a.id)
        }
    }, [searchTerm, selectedTag, sortBy])

    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    // Simulate loading state when filters change
    const handleFilterChange = async (
        newSearchTerm: string,
        newTag: string
    ) => {
        setIsLoading(true)
        setSearchTerm(newSearchTerm)
        setSelectedTag(newTag)
        setCurrentPage(1)
        await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API call
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Header and Filters */}
                <motion.div className="mb-8 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-extrabold text-gray-900 dark:text-white"
                    >
                        My Projects
                    </motion.h1>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="flex-1 p-2 border rounded-md dark:bg-gray-800"
                            value={searchTerm}
                            onChange={(e) =>
                                handleFilterChange(e.target.value, selectedTag)
                            }
                        />

                        <select
                            className="p-2 border rounded-md dark:bg-gray-800"
                            value={selectedTag}
                            onChange={(e) =>
                                handleFilterChange(searchTerm, e.target.value)
                            }
                        >
                            <option value="">All Tags</option>
                            {allTags.map((tag) => (
                                <option key={tag} value={tag}>
                                    {tag}
                                </option>
                            ))}
                        </select>

                        <select
                            className="p-2 border rounded-md dark:bg-gray-800"
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as 'title' | 'recent')
                            }
                        >
                            <option value="recent">Most Recent</option>
                            <option value="title">Alphabetical</option>
                        </select>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-lg" />
                                    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-b-lg">
                                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {paginatedProjects.length === 0 ? (
                                <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                                    No projects found matching your criteria.
                                </p>
                            ) : (
                                paginatedProjects.map((project, index) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                    />
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

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
