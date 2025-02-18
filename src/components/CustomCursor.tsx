'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const cursorX = useSpring(0, { stiffness: 700, damping: 30 })
    const cursorY = useSpring(0, { stiffness: 700, damping: 30 })
    const cursorScale = useSpring(1, { stiffness: 700, damping: 30 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)

            const target = e.target as HTMLElement
            const isHoverable = target.closest('[data-hoverable]')
            setIsHovering(!!isHoverable)
            cursorScale.set(isHoverable ? 2.5 : 1)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [cursorX, cursorY, cursorScale])

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
            style={{
                x: cursorX,
                y: cursorY,
                scale: cursorScale,
            }}
        >
            <div className="w-full h-full rounded-full bg-white opacity-90" />
        </motion.div>
    )
}
