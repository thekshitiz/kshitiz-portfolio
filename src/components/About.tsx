'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
    const highlights = [
        {
            title: 'Problem Solver',
            description:
                'Turning complex challenges into elegant solutions through code and creativity.',
            icon: '🎯',
        },
        {
            title: 'Full Stack Expert',
            description:
                'Mastering both frontend magic and backend architecture for seamless applications.',
            icon: '💻',
        },
        {
            title: 'Tech Enthusiast',
            description:
                'Always learning and implementing the latest technologies and best practices.',
            icon: '🚀',
        },
    ]

    const stats = [
        { label: 'Years of Experience', value: '5+' },
        { label: 'Projects Delivered', value: '50+' },
        { label: 'Technologies Mastered', value: '15+' },
        { label: 'Happy Clients', value: '30+' },
    ]

    return (
        <section className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/30 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        Crafting Digital
                        <br />
                        Experiences That Matter
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                    >
                        Full-stack developer specializing in building
                        exceptional digital experiences. Every line of code is
                        crafted with purpose, performance, and user experience
                        in mind.
                    </motion.p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="/profile.jpg"
                                alt="Profile"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Right Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Building tomorrow&apos;s web, today.
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            With a passion for clean code and innovative
                            solutions, I help businesses transform their digital
                            presence. From responsive web applications to
                            scalable backend systems, every project is an
                            opportunity to exceed expectations.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                                >
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Highlights Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((highlight, index) => (
                        <motion.div
                            key={highlight.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
                        >
                            <div className="text-4xl mb-4">
                                {highlight.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                {highlight.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {highlight.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
