'use client'

import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    animate,
} from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function About() {
    const [showVideo, setShowVideo] = useState(false)

    // Underline animation variants with minimal spacing
    const underlineVariants = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    }

    // Slower number animation variant
    const numberVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2, // Increased duration
                ease: [0.215, 0.61, 0.355, 1],
                delay: i * 0.2, // Increased delay between items
            },
        }),
    }

    // Stagger children animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    // Stats with counter animation
    const stats = [
        { number: 5, label: 'Years', description: 'Of Development' },
        { number: 50, label: 'Projects', description: 'Delivered' },
        { number: 15, label: 'Technologies', description: 'Mastered' },
        { number: 30, label: 'Clients', description: 'Worldwide' },
    ]

    // Counter animation component with counting effect
    const Counter = ({ number }: { number: number }) => {
        const count = useMotionValue(0)
        const rounded = useTransform(count, (latest) => Math.round(latest))

        useEffect(() => {
            const controls = animate(count, number, {
                duration: 4, // Increased duration to 4 seconds
                ease: [0.12, 0, 0.39, 0], // Custom easing for slower start
                delay: 1.5, // Added delay before starting
            })

            return controls.stop
        }, [count, number])

        return (
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="flex items-baseline justify-center"
            >
                <motion.span>{rounded}</motion.span>
                <span className="ml-1">+</span>
            </motion.div>
        )
    }

    // Media toggle section
    const MediaSection = () => (
        <div className="relative">
            {/* Media Container */}
            <motion.div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            >
                {showVideo ? (
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        controls
                        src="/resume-vid.mp4"
                    />
                ) : (
                    <Image
                        src="/profile.png"
                        alt="Profile"
                        fill
                        className="object-contain"
                        priority
                    />
                )}
            </motion.div>

            {/* Toggle Button - Now below the media */}
            <motion.button
                onClick={() => setShowVideo(!showVideo)}
                className="w-full flex items-center justify-center space-x-3 px-6 py-3 
                          bg-gray-900 dark:bg-gray-800 text-white rounded-xl 
                          hover:bg-gray-800 dark:hover:bg-gray-700 transition-all
                          group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Background animation on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                />

                {showVideo ? (
                    <>
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center space-x-2"
                        >
                            <svg
                                className="w-5 h-5 transition-transform group-hover:rotate-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="font-medium">View Photo</span>
                        </motion.div>
                    </>
                ) : (
                    <>
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center space-x-2"
                        >
                            <svg
                                className="w-5 h-5 transition-transform group-hover:rotate-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="font-medium">Watch Resume</span>
                        </motion.div>
                    </>
                )}
            </motion.button>
        </div>
    )

    // Update the stats section animation timing
    const statsContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5, // Increased delay between items
                delayChildren: 0.8, // Delay before starting
            },
        },
    }

    return (
        <section className="relative min-h-screen bg-white dark:bg-gray-900 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* About Header */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 text-center mb-16"
                >
                    About
                </motion.h2>

                {/* Hero Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="text-center mb-20"
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-6"
                        variants={containerVariants}
                    >
                        <motion.span
                            className="block text-gray-900 dark:text-white mb-2"
                            variants={numberVariants}
                            custom={0}
                        >
                            Crafting Digital
                        </motion.span>
                        <motion.span
                            className="relative inline-block text-gray-900 dark:text-white"
                            variants={numberVariants}
                            custom={1}
                        >
                            Experiences
                            <motion.span
                                className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-900 dark:bg-white"
                                variants={underlineVariants}
                            />
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        variants={numberVariants}
                        custom={2}
                    >
                        Full-stack developer focused on building exceptional
                        digital experiences that make a difference.
                    </motion.p>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    <MediaSection />

                    {/* Content */}
                    <div className="space-y-8">
                        <motion.h2
                            className="text-3xl font-bold text-gray-900 dark:text-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Building{' '}
                            <span className="relative inline-block">
                                tomorrow&apos;s web
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-900 dark:bg-white"
                                    variants={underlineVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                />
                            </span>
                            , today
                        </motion.h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            With a focus on user experience and performance, I
                            create scalable solutions that help businesses
                            thrive in the digital world.
                        </p>
                    </div>
                </div>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32" // Increased bottom margin
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                >
                    {[
                        {
                            icon: '🎨',
                            title: 'Frontend Development',
                            description:
                                'Creating responsive and intuitive user interfaces with modern frameworks.',
                        },
                        {
                            icon: '⚙️',
                            title: 'Backend Architecture',
                            description:
                                'Building robust and scalable server-side solutions.',
                        },
                        {
                            icon: '⚡',
                            title: 'Performance Optimization',
                            description:
                                'Ensuring fast, efficient, and reliable applications.',
                        },
                    ].map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            variants={numberVariants}
                            custom={index}
                            className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 },
                            }}
                        >
                            <motion.div
                                className="text-4xl mb-4"
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                {skill.icon}
                            </motion.div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                {skill.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {skill.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Grid with Counter Animation */}
                <motion.div
                    className="max-w-5xl mx-auto"
                    variants={statsContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }} // Allow animation to replay
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center"
                                variants={numberVariants}
                                custom={index}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                <motion.div
                                    className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 2,
                                        delay: index * 0.3,
                                    }}
                                >
                                    <Counter number={stat.number} />
                                </motion.div>
                                <div className="text-base font-medium text-gray-900 dark:text-white">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {stat.description}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
