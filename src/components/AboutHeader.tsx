'use client'

import { motion } from 'framer-motion'

export function AboutHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20 space-y-4"
        >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                About Me
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                Get to know more about my journey and expertise.
            </p>
        </motion.div>
    )
}
