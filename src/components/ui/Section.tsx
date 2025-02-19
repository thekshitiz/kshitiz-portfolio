import { motion } from 'framer-motion'
import { animations } from '@/lib/constants'

interface SectionProps {
    children: React.ReactNode
    className?: string
    id?: string
    alternate?: boolean
}

export function Section({
    children,
    className = '',
    id,
    alternate = false,
}: SectionProps) {
    return (
        <section
            id={id}
            className={`py-20 px-4 sm:px-6 lg:px-8 ${
                alternate ? 'bg-gray-50 dark:bg-gray-800/50' : ''
            } ${className}`}
        >
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={animations.fadeIn}
                className="max-w-7xl mx-auto"
            >
                {children}
            </motion.div>
        </section>
    )
}
