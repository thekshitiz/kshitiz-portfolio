import { useState, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useCount(end: number, duration: number = 2) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (isInView && !hasAnimated) {
            let startTime: number
            let animationFrame: number

            const animate = (currentTime: number) => {
                if (!startTime) {
                    startTime = currentTime
                }

                const progress = (currentTime - startTime) / (duration * 1000)

                if (progress < 1) {
                    setCount(Math.min(Math.floor(end * progress), end))
                    animationFrame = requestAnimationFrame(animate)
                } else {
                    setCount(end)
                    setHasAnimated(true)
                }
            }

            animationFrame = requestAnimationFrame(animate)
            return () => cancelAnimationFrame(animationFrame)
        }
    }, [end, duration, isInView, hasAnimated])

    return { count, ref }
} 