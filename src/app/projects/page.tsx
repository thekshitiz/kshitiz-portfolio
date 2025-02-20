'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'

const ITEMS_PER_PAGE = 6

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // Filter projects based on search term
    const filteredProjects = useMemo(() => {
        return projects.filter((project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])

    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
    const currentProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1) // Reset to first page on search
                        }}
                        className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {currentProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.3,
                                    ease: 'easeInOut',
                                }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
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
