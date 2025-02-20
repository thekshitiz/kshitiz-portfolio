'use client'

import { motion } from 'framer-motion'

export function ProjectsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20 space-y-4"
        >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Featured Projects
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                A selection of my recent work and ongoing projects.
            </p>
        </motion.div>
    )
}
