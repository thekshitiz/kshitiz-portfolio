'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import CircularText from './CircularText'

const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS']

export default function Hero() {
    return (
        <div
            id="home"
            className="relative min-h-screen bg-gray-50 dark:bg-gray-900"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
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
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            type: 'spring',
                            stiffness: 100,
                        }}
                        className="space-y-8"
                    >
                        {/* Enhanced Animated Introduction */}
                        <div className="space-y-2">
                            <motion.h2
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.8,
                                    type: 'spring',
                                    stiffness: 100,
                                }}
                                className="text-2xl text-gray-600 dark:text-gray-400"
                            >
                                Hi, I'm
                            </motion.h2>
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    type: 'spring',
                                    stiffness: 100,
                                }}
                                className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white"
                            >
                                Kshitiz
                            </motion.h1>
                            <div className="h-16 sm:h-20">
                                <TypeAnimation
                                    sequence={[
                                        'A Full Stack Developer',
                                        1500,
                                        'A UI/UX Enthusiast',
                                        1500,
                                        'A Problem Solver',
                                        1500,
                                        'A Tech Innovator',
                                        1500,
                                    ]}
                                    wrapper="h2"
                                    speed={50}
                                    repeat={Infinity}
                                    className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Enhanced Description Animation */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.4,
                                type: 'spring',
                                stiffness: 100,
                            }}
                            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl"
                        >
                            Crafting beautiful and functional digital
                            experiences that leave a lasting impression.
                        </motion.p>

                        {/* Enhanced CTA Buttons Animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.6,
                                type: 'spring',
                                stiffness: 100,
                            }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                href="/#portfolio"
                                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors"
                            >
                                View Projects
                            </Link>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600"
                            >
                                Contact Me
                            </Link>
                        </motion.div>

                        {/* Enhanced Tech Stack Animation */}
                        <div className="space-y-4">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.8,
                                    type: 'spring',
                                    stiffness: 100,
                                }}
                                className="text-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                                Tech Stack
                            </motion.p>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.15,
                                            delayChildren: 1,
                                        },
                                    },
                                }}
                                className="flex flex-wrap gap-4"
                            >
                                {techStack.map((tech, index) => (
                                    <motion.span
                                        key={tech}
                                        variants={{
                                            hidden: {
                                                opacity: 0,
                                                y: 50,
                                                scale: 0.3,
                                                rotate: -180,
                                            },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                                rotate: 0,
                                            },
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 200,
                                            damping: 20,
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 5,
                                            transition: { duration: 0.2 },
                                        }}
                                        className="px-4 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <CircularText />
        </div>
    )
}
