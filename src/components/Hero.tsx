'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero.jpg"
                    alt="Hero background"
                    fill
                    priority
                    className="object-cover object-center opacity-20 dark:opacity-10"
                    quality={100}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-40">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Hi, I&apos;m</span>{' '}
                            <span className="block text-black dark:text-white xl:inline">
                                Kshitiz
                            </span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            A passionate full-stack developer crafting beautiful and
                            functional digital experiences.
                        </p>
                        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="#projects"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors"
                            >
                                View Projects
                            </Link>
                            <Link
                                href="#contact"
                                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Contact Me
                            </Link>
                        </div>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-16"
                    >
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                            Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {[
                                'React',
                                'Next.js',
                                'TypeScript',
                                'Node.js',
                                'Tailwind CSS',
                            ].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
} 