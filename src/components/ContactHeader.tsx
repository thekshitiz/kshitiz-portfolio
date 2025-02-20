'use client'

import { motion } from 'framer-motion'

export function ContactHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20 space-y-4"
        >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Get in Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                Have a question or want to work together? Feel free to reach
                out.
            </p>
        </motion.div>
    )
}
