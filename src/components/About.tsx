'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useCount } from '@/hooks/useCount'
import { Button } from './ui/Button'

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

const MetricCard = ({ number, label }: { number: string; label: string }) => {
    const isNumeric = !isNaN(parseInt(number))
    const numericValue = isNumeric ? parseInt(number) : 0
    const suffix = isNumeric ? number.replace(numericValue.toString(), '') : ''

    const { count, ref } = useCount(numericValue)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
            }}
            className="text-center"
        >
            <motion.div
                className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                whileInView={{ scale: [0.5, 1.2, 1] }}
                transition={{ duration: 0.5, times: [0, 0.8, 1] }}
            >
                {isNumeric ? count : number}
                {suffix}
            </motion.div>
            <div className="text-gray-600 dark:text-gray-400">{label}</div>
        </motion.div>
    )
}

const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technologies', value: '15+' },
    { label: 'Happy Clients', value: '30+' },
]

const skills = [
    { name: 'Frontend', level: 90 },
    { name: 'Backend', level: 85 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'DevOps', level: 75 },
]

export default function About() {
    return (
        <section id="about" className="relative py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-[800px] h-[800px] -right-40 -top-40">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-3xl" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-square rounded-3xl overflow-hidden">
                            <Image
                                src="/your-image.jpg"
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Floating Stats */}
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 * index }}
                                        className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl"
                                    >
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400 font-medium">
                                About Me
                            </h2>
                            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                                Crafting Digital Experiences with Passion
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                I'm a full-stack developer with a passion for
                                creating innovative digital solutions. With
                                expertise in modern web technologies and a keen
                                eye for design, I bring ideas to life through
                                clean, efficient code.
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="space-y-6">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="space-y-2"
                                >
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {skill.name}
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {skill.level}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{
                                                width: `${skill.level}%`,
                                            }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 1,
                                                delay: 0.2,
                                            }}
                                            className="h-full bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-500 dark:to-violet-500"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="flex gap-4 pt-4">
                            <Button variant="primary" href="/resume">
                                Download Resume
                            </Button>
                            <Button variant="outline" href="/#contact">
                                Let's Talk
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
