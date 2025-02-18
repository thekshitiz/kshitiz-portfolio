'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CustomCursor() {
    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)
    const [isPointer, setIsPointer] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    // Create smooth spring animations
    const springConfig = { damping: 25, stiffness: 200 }
    const smoothX = useSpring(cursorX, springConfig)
    const smoothY = useSpring(cursorY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)

            const target = e.target as HTMLElement
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                    target.tagName === 'BUTTON' ||
                    target.tagName === 'A'
            )
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [cursorX, cursorY])

    return (
        <>
            {/* Outer cursor (glow) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="relative flex items-center justify-center"
                    animate={{
                        scale: isPointer ? 2 : 1,
                        opacity: isClicking ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-8 h-8 bg-white/30 rounded-full blur-md" />
                    <motion.div
                        className="absolute inset-0 rounded-full border border-white/50"
                        animate={{
                            scale: isPointer ? 1.2 : 1,
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Inner cursor (dot) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                        scale: isClicking ? 0.8 : 1,
                    }}
                    transition={{ duration: 0.1 }}
                />
            </motion.div>
        </>
    )
}
