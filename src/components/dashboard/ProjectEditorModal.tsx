'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'

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

interface ProjectEditorModalProps {
    isOpen: boolean
    onClose: () => void
    project?: Project | null
    onSave: (project: Omit<Project, 'id'>) => Promise<void>
}

export default function ProjectEditorModal({
    isOpen,
    onClose,
    project,
    onSave,
}: ProjectEditorModalProps) {
    const [formData, setFormData] = useState<Omit<Project, 'id'>>({
        title: '',
        description: '',
        image: '',
        tags: [],
        demoUrl: '',
        githubUrl: '',
        featured: false,
        status: 'draft',
    })
    const [newTag, setNewTag] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title,
                description: project.description,
                image: project.image,
                tags: project.tags,
                demoUrl: project.demoUrl || '',
                githubUrl: project.githubUrl || '',
                featured: project.featured,
                status: project.status,
            })
        }
    }, [project])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await onSave(formData)
            onClose()
        } catch (error) {
            console.error('Failed to save project:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag.trim()],
            })
            setNewTag('')
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove),
        })
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {project ? 'Edit Project' : 'New Project'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="p-4 space-y-4"
                            >
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                title: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
                                        placeholder="Project title"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
                                        placeholder="Project description"
                                        required
                                    />
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                image: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tags
                                    </label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={newTag}
                                            onChange={(e) =>
                                                setNewTag(e.target.value)
                                            }
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleAddTag()
                                                }
                                            }}
                                            className="block flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
                                            placeholder="Add a tag"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddTag}
                                            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            <PlusIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formData.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveTag(tag)
                                                    }
                                                    className="ml-1 hover:text-blue-800 dark:hover:text-blue-300"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* URLs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Demo URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.demoUrl}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    demoUrl: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
                                            placeholder="https://demo.example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            GitHub URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.githubUrl}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    githubUrl: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
                                            placeholder="https://github.com/username/repo"
                                        />
                                    </div>
                                </div>

                                {/* Options */}
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.featured}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    featured: e.target.checked,
                                                })
                                            }
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                            Featured project
                                        </span>
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                status: e.target.value as
                                                    | 'draft'
                                                    | 'published',
                                            })
                                        }
                                        className="block rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">
                                            Published
                                        </option>
                                    </select>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50"
                                    >
                                        {isLoading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}
