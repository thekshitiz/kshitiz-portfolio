'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const phrases = [
    'AVAILABLE FOR WORK • ',
    'LETS BUILD TOGETHER • ',
    'OPEN TO COLLABORATE • ',
    'CREATIVE DEVELOPER • ',
    'DIGITAL CRAFTSMAN • ',
]

export default function CircularText() {
    const circleRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)
    const [currentPhrase, setCurrentPhrase] = useState(phrases[0])

    useEffect(() => {
        setMounted(true)
        setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)])
    }, [])

    useEffect(() => {
        if (!mounted || !circleRef.current) return

        const arrangeText = (
            text: string,
            element: HTMLDivElement,
            radius: number
        ) => {
            const chars = text.split('')
            const angle = 360 / chars.length

            element.innerHTML = chars
                .map(
                    (char, i) => `
                    <span 
                        class="absolute left-1/2 -translate-x-1/2"
                        style="
                            transform-origin: 0 ${radius}px;
                            transform: rotate(${angle * i}deg);
                        "
                    >${char}</span>
                `
                )
                .join('')
        }

        arrangeText(currentPhrase, circleRef.current, 240)
    }, [currentPhrase, mounted])

    if (!mounted) return null

    return (
        <div
            className="absolute right-[5%] top-[10%] z-50"
            aria-label="Rotating text animation"
            role="presentation"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative w-[530px] h-[530px]"
            >
                <motion.div
                    ref={circleRef}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute inset-0 circular-text"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-2.5 h-2.5 bg-black rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    )
}
