'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-full">
            <motion.div
                className="w-12 h-12 border-4 border-gray-300 border-t-black dark:border-gray-600 dark:border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    )
}
