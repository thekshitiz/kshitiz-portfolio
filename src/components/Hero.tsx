'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { useTheme } from 'next-themes'

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
            className="relative min-h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    background: `
                        radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, 
                        ${
                            theme === 'dark'
                                ? 'rgba(29, 78, 216, 0.15)'
                                : 'rgba(29, 78, 216, 0.1)'
                        }, transparent 80%)
                    `,
                }}
            />

            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-left space-y-8"
                    >
                        <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium">
                            Welcome to my portfolio
                        </h2>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                            Hi, I'm{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                                Kshitiz
                            </span>
                        </h1>
                        <div className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 h-[60px]">
                            <TypeAnimation
                                sequence={[
                                    'Building digital experiences',
                                    2000,
                                    'Crafting modern interfaces',
                                    2000,
                                    'Creating innovative solutions',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                                className="font-light"
                            />
                        </div>
                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <a
                                href="#portfolio"
                                className="group relative px-8 py-3 rounded-full overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-300 ease-out group-hover:scale-105" />
                                <span className="relative text-white font-medium">
                                    View Projects
                                </span>
                            </a>
                            <a
                                href="#contact"
                                className="group relative px-8 py-3 rounded-full overflow-hidden"
                            >
                                <div className="absolute inset-0 border border-gray-200 dark:border-gray-700 rounded-full transition-all duration-300 ease-out group-hover:border-blue-500 dark:group-hover:border-blue-400" />
                                <span className="relative text-gray-900 dark:text-white font-medium">
                                    Contact Me
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Visual element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 dark:from-blue-400/10 dark:to-violet-400/10 rounded-full animate-pulse" />
                            <div className="absolute inset-4 bg-gradient-to-br from-blue-500/30 to-violet-500/30 dark:from-blue-400/20 dark:to-violet-400/20 rounded-full animate-pulse animation-delay-2000" />
                            <div className="absolute inset-8 bg-gradient-to-br from-blue-500/40 to-violet-500/40 dark:from-blue-400/30 dark:to-violet-400/30 rounded-full animate-pulse animation-delay-4000" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-gray-400 to-transparent animate-pulse" />
            </motion.div>
        </motion.div>
    )
}
