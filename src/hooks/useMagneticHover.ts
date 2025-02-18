'use client'

import { useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export function useMagneticHover(strength: number = 1) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useSpring(0, { stiffness: 400, damping: 30 })
    const y = useSpring(0, { stiffness: 400, damping: 30 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const element = ref.current
            if (!element) return

            const rect = element.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            const distanceX = e.clientX - centerX
            const distanceY = e.clientY - centerY

            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
            const maxDistance = 100

            if (distance < maxDistance) {
                const magneticX = (distanceX / maxDistance) * 20 * strength
                const magneticY = (distanceY / maxDistance) * 20 * strength
                x.set(magneticX)
                y.set(magneticY)
            } else {
                x.set(0)
                y.set(0)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [strength, x, y])

    return { ref, x, y }
}
