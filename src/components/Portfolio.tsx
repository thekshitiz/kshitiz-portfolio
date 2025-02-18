'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const projects = [
    {
        id: 1,
        title: 'Project 1',
        description: 'Description of Project 1',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['React', 'TypeScript', 'Tailwind'],
    },
    {
        id: 2,
        title: 'Project 2',
        description: 'Description of Project 2',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['Next.js', 'Node.js', 'MongoDB'],
    },
    {
        id: 3,
        title: 'Project 3',
        description: 'Description of Project 3',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['React Native', 'Firebase', 'Redux'],
    },
]

export default function Portfolio() {
    return (
        <section id="portfolio" className="py-20">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8"
                >
                    My Portfolio
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={400}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="text-black dark:text-white font-medium hover:underline"
                                >
                                    View Project
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
} 