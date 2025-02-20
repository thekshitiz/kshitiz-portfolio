'use client'

import { motion } from 'framer-motion'

export function WelcomeSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 bg-white dark:bg-gray-900"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Welcome to My Portfolio
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Explore my work, learn about my journey, and get in
                        touch. Feel free to navigate through the different
                        sections using the menu.
                    </p>
                </div>
            </div>
        </motion.section>
    )
}
