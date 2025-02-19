'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    TagIcon,
    LinkIcon,
} from '@heroicons/react/24/outline'
import ProjectEditorModal from '@/components/dashboard/ProjectEditorModal'

interface Project {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    demoUrl?: string
    githubUrl?: string
    featured: boolean
    status: 'draft' | 'published'
}

const mockProjects: Project[] = [
    {
        id: '1',
        title: 'E-commerce Dashboard',
        description:
            'A modern e-commerce dashboard built with Next.js and Tailwind CSS',
        image: '/projects/ecommerce.jpg',
        tags: ['Next.js', 'React', 'Tailwind CSS'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example/project',
        featured: true,
        status: 'published',
    },
    {
        id: '2',
        title: 'AI Chat Application',
        description: 'Real-time chat application with AI integration',
        image: '/projects/chat.jpg',
        tags: ['React', 'Socket.io', 'OpenAI'],
        featured: false,
        status: 'draft',
    },
]

export default function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>(mockProjects)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Portfolio Projects
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your portfolio projects and showcase your work
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    New Project
                </motion.button>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                    >
                        {/* Project Image */}
                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <span className="text-gray-400">
                                        No image
                                    </span>
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex space-x-1">
                                {project.featured && (
                                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full">
                                        Featured
                                    </span>
                                )}
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        project.status === 'published'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    }`}
                                >
                                    {project.status}
                                </span>
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {project.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full"
                                    >
                                        <TagIcon className="w-3 h-3 mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="mt-4 flex items-center space-x-4">
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-500 flex items-center"
                                    >
                                        <LinkIcon className="w-4 h-4 mr-1" />
                                        Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-500 flex items-center"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        GitHub
                                    </a>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex items-center justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        /* View logic */
                                    }}
                                    className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                >
                                    <EyeIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setSelectedProject(project)}
                                    className="p-1 text-blue-400 hover:text-blue-500"
                                >
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        /* Delete logic */
                                    }}
                                    className="p-1 text-red-400 hover:text-red-500"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Project Editor Modal */}
            <ProjectEditorModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false)
                    setSelectedProject(null)
                }}
                project={selectedProject}
                onSave={async (projectData) => {
                    // TODO: Implement save logic with API
                    console.log('Saving project:', projectData)
                }}
            />
        </div>
    )
}
