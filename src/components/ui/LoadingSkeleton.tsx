import { motion } from 'framer-motion'

export default function LoadingSkeleton() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="w-12 h-12 rounded-full bg-black dark:bg-white"
            />
        </div>
    )
}
