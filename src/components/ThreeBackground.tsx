'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const ThreeBackground = dynamic(() => import('./ThreeBackgroundCanvas'), {
    ssr: false,
})

export default function ThreeBackgroundWrapper() {
    return (
        <motion.div
            className="fixed inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <ThreeBackground />
        </motion.div>
    )
}
