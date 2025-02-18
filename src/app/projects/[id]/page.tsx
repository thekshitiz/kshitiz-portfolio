'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { projects } from '@/lib/projects'
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectDetail() {
    const { id } = useParams()
    const project = projects.find(p => p.id === Number(id))

    if (!project) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Project not found</h1>
                    <Link href="/projects" className="text-blue-500 hover:underline">
                        Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <main className="max-w-4xl mx-auto py-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/projects"
                        className="text-gray-600 dark:text-gray-400 hover:underline mb-8 block"
                    >
                        ← Back to Projects
                    </Link>
                    
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={400}
                        className="w-full h-[400px] object-cover rounded-lg mb-8"
                    />

                    <h1 className="text-4xl font-bold mb-4 dark:text-white">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map(tag => (
                            <span
                                key={tag}
                                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                        <p className="mb-8">{project.details.challenge}</p>

                        <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                        <p className="mb-8">{project.details.solution}</p>

                        <h2 className="text-2xl font-bold mb-4">Impact</h2>
                        <p className="mb-8">{project.details.impact}</p>

                        <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                        <ul className="list-disc pl-6 mb-8">
                            {project.details.technologies.map(tech => (
                                <li key={tech}>{tech}</li>
                            ))}
                        </ul>

                        <div className="flex gap-4 mt-8">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-md hover:opacity-90"
                                >
                                    View Live Site
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-200 dark:bg-gray-700 px-6 py-2 rounded-md hover:opacity-90"
                                >
                                    View Source
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
} 