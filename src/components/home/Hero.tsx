'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
}

const techStack = [
    { name: 'React', color: 'from-cyan-400 to-blue-500' },
    {
        name: 'Next.js',
        color: 'from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400',
    },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
    { name: 'Tailwind CSS', color: 'from-teal-400 to-cyan-500' },
]

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const heroRef = useRef<HTMLDivElement>(null)
    const { theme } = useTheme()

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const { left, top } = heroRef.current.getBoundingClientRect()
                setMousePosition({
                    x: e.clientX - left,
                    y: e.clientY - top,
                })
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <motion.div
            ref={heroRef}
            initial="initial"
            animate="animate"
            className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background gradient following mouse */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${
                        theme === 'dark'
                            ? 'rgba(29, 78, 216, 0.15)'
                            : 'rgba(219, 234, 254, 0.15)'
                    }, transparent)`,
                }}
            />

            {/* Enhanced main content */}
            <div className="relative z-10 text-center space-y-8 px-4 max-w-7xl mx-auto">
                <motion.div
                    variants={{
                        initial: { opacity: 0, scale: 0.9 },
                        animate: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="space-y-4"
                >
                    <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
                        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                            Creative
                        </span>
                        <br />
                        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
                            Developer
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light"
                    >
                        Crafting digital experiences with code and creativity
                    </motion.p>
                </motion.div>

                {/* Enhanced tech badges */}
                <motion.div
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                    }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {techStack.map((tech, index) => (
                        <motion.span
                            key={tech.name}
                            variants={{
                                initial: { scale: 0, opacity: 0 },
                                animate: { scale: 1, opacity: 1 },
                            }}
                            transition={{ delay: index * 0.1 + 0.6 }}
                            className="group relative"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r w-full h-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                            <span
                                className={`relative px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${tech.color} text-white shadow-lg transform hover:scale-105 transition-transform duration-200`}
                            >
                                {tech.name}
                            </span>
                        </motion.span>
                    ))}
                </motion.div>

                {/* Enhanced CTA Buttons */}
                <motion.div
                    variants={fadeInUp}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-6"
                >
                    <a
                        href="#projects"
                        className="group relative px-8 py-3 rounded-lg overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 transition-transform duration-300 group-hover:scale-105" />
                        <span className="relative text-white font-medium">
                            View Projects
                        </span>
                    </a>
                    <a
                        href="#contact"
                        className="group relative px-8 py-3 rounded-lg overflow-hidden bg-transparent"
                    >
                        <div className="absolute inset-0 border-2 border-blue-600 dark:border-blue-400 rounded-lg transition-transform duration-300 group-hover:scale-105" />
                        <span className="relative text-blue-600 dark:text-blue-400 font-medium">
                            Contact Me
                        </span>
                    </a>
                </motion.div>
            </div>

            {/* Enhanced scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 1.5,
                }}
                className="absolute bottom-8 flex flex-col items-center space-y-2"
            >
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Scroll to explore
                </span>
                <ArrowDownIcon className="w-6 h-6 text-gray-400 animate-bounce" />
            </motion.div>

            {/* Enhanced decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300 to-blue-400 dark:from-blue-800 dark:to-blue-900 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-violet-300 to-purple-400 dark:from-violet-800 dark:to-purple-900 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-300 to-red-400 dark:from-pink-800 dark:to-red-900 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            </div>
        </motion.div>
    )
}
