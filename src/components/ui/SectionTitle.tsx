import { motion } from 'framer-motion'
import { GradientText } from './GradientText'
import { animations } from '@/lib/constants'

interface SectionTitleProps {
    title: string
    subtitle: string
    gradient: string
}

export function SectionTitle({ title, subtitle, gradient }: SectionTitleProps) {
    return (
        <motion.div variants={animations.fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <GradientText gradient={gradient}>{title}</GradientText>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {subtitle}
            </p>
        </motion.div>
    )
}
