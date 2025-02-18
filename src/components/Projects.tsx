'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// List of your projects with their details
const projects = [
    {
        title: 'Project One',
        description: 'A brief description of the project',
        tags: ['React', 'TypeScript', 'Tailwind'], // Technologies used
        image: '/project1.jpg', // Project screenshot
        link: '/projects/1', // Link to project details
    },
    {
        title: 'Project Two',
        description: 'Another amazing project with cutting-edge technology.',
        tags: ['Next.js', 'Node.js', 'MongoDB'],
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        link: '/projects/2',
    },
    {
        title: 'Project Three',
        description: 'An innovative solution for modern problems.',
        tags: ['React Native', 'Firebase', 'AWS'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        link: '/projects/3',
    },
    // Add more projects...
]

export default function Projects() {
    return (
        <div id="portfolio" className="min-h-screen">
            <section className="py-20 px-4 md:px-24">
                <div className="max-w-4xl mx-auto">
                    {/* Notion-like section header */}
                    <div className="mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors inline-block cursor-text"
                        >
                            Featured Projects
                        </motion.h2>
                    </div>

                    {/* Project Grid */}
                    <div className="grid gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                            >
                                <Link href={project.link}>
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* View All Projects Button */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-colors"
                        >
                            View All Projects →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
