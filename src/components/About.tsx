'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const aboutContent = {
    intro: `Hello! I'm Kshitiz, a Full Stack Developer with 3+ years of experience in web and mobile development. I specialize in building scalable web applications, responsive interfaces, and cross-platform mobile solutions using cutting-edge technologies like React, Next.js, Node.js, and React Native.`,

    journey: `My journey in software development began at Tribhuvan University, where I discovered my passion for creating innovative digital solutions. Since then, I've had the privilege of working with startups, established tech companies, and international clients, contributing to projects that have impacted thousands of users. Notable achievements include developing a high-performance e-commerce platform that increased client conversion rates by 40% and architecting a real-time analytics dashboard currently used by multiple Fortune 500 companies.`,

    personal: `When I'm not coding or architecting solutions, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical blog posts. I believe in writing clean, maintainable code and creating user-centric solutions that make a real difference. Whether it's optimizing performance, improving user experience, or solving complex technical challenges, I'm always excited to push the boundaries of what's possible in web development.`,

    skills: [
        'React/Next.js',
        'Node.js/Express',
        'TypeScript',
        'React Native',
        'MongoDB',
        'AWS/Cloud',
        'UI/UX Design',
        'Performance Optimization',
    ],

    metrics: [
        {
            number: '50+',
            label: 'Projects Completed',
        },
        {
            number: '100%',
            label: 'Client Satisfaction',
        },
        {
            number: '30+',
            label: 'Happy Clients',
        },
        {
            number: '15+',
            label: 'Open Source Contributions',
        },
    ],
}

export default function About() {
    return (
        <div id="about" className="min-h-screen">
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8"
                    >
                        About Me
                    </motion.h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src="/profile.jpg"
                                        alt="Kshitiz - Full Stack Developer"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    {aboutContent.intro}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {aboutContent.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6 mb-16"
                        >
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                {aboutContent.journey}
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                {aboutContent.personal}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        >
                            {aboutContent.metrics.map((metric) => (
                                <div key={metric.label} className="text-center">
                                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                        {metric.number}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">
                                        {metric.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-12 text-center"
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
                            >
                                Let's Work Together
                                <ArrowRightIcon className="w-5 h-5 ml-2" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
