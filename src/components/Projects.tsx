'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

// List of your projects with their details
const projects = [
    {
        title: 'E-Commerce Platform',
        description:
            'A modern e-commerce platform with real-time inventory and AI-powered recommendations.',
        image: '/projects/ecommerce.jpg',
        tags: ['Next.js', 'Node.js', 'MongoDB', 'TailwindCSS'],
        link: '/projects/ecommerce',
        color: 'from-blue-500/20 to-violet-500/20',
    },
    {
        title: 'Healthcare Dashboard',
        description:
            'Analytics dashboard for healthcare providers with real-time patient monitoring.',
        image: '/projects/healthcare.jpg',
        tags: ['React', 'TypeScript', 'AWS', 'D3.js'],
        link: '/projects/healthcare',
        color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
        title: 'Mobile Banking App',
        description:
            'Cross-platform banking application with biometric authentication.',
        image: '/projects/banking.jpg',
        tags: ['React Native', 'Firebase', 'Node.js'],
        link: '/projects/banking',
        color: 'from-orange-500/20 to-red-500/20',
    },
    // Add more projects...
]

export default function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section className="relative py-24 bg-white dark:bg-gray-900">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-[1000px] h-[1000px] -top-[500px] -right-[500px] opacity-30">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-3xl animate-pulse" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20 space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        A selection of my recent work and ongoing projects.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-16">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative"
                        >
                            <motion.div
                                className={`
                                    relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center
                                    p-8 rounded-2xl overflow-hidden
                                    ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}
                                `}
                                whileHover={{ scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/0 z-10" />
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative space-y-6">
                                    <motion.h3
                                        className="text-2xl font-bold text-gray-900 dark:text-white"
                                        initial={{ opacity: 0.8 }}
                                        animate={
                                            hoveredIndex === index
                                                ? { opacity: 1, x: 10 }
                                                : { opacity: 0.8, x: 0 }
                                        }
                                    >
                                        {project.title}
                                    </motion.h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View Project Link */}
                                    <motion.a
                                        href={project.link}
                                        className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        whileHover={{ x: 5 }}
                                    >
                                        <span>View Project</span>
                                        <ArrowUpRightIcon className="w-4 h-4" />
                                    </motion.a>
                                </div>

                                {/* Hover Gradient */}
                                <div
                                    className={`
                                        absolute inset-0 bg-gradient-to-br ${project.color}
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                        rounded-2xl
                                    `}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
