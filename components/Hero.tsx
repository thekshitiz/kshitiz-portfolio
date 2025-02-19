'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS']

export default function Hero() {
    return (
        <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="sm:text-center lg:text-left"
                        >
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Hi, I'm</span>{' '}
                                <span className="block text-black dark:text-white xl:inline">
                                    Kshitiz
                                </span>
                            </h1>
                            <div className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                <TypeAnimation
                                    sequence={[
                                        'I build web applications',
                                        2000,
                                        'I create user experiences',
                                        2000,
                                        'I develop software solutions',
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                    className="font-medium text-black dark:text-white"
                                />
                            </div>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="rounded-md shadow"
                                >
                                    <Link
                                        href="#contact"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                                    >
                                        Get in touch
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-3 sm:mt-0 sm:ml-3"
                                >
                                    <Link
                                        href="#portfolio"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                                    >
                                        View my work
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </main>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
            >
                <Image
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="/hero-image.jpg"
                    alt="Hero Image"
                    width={800}
                    height={600}
                    priority
                />
            </motion.div>
        </div>
    )
}
