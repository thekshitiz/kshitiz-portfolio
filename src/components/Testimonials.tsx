'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
    {
        name: 'John Doe',
        role: 'Digital Nomad',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        content:
            'Our development journey has been simply incredible. Kshitiz has shown to not only have top quality expertise in their work but also goes above and beyond in customer service!',
        rating: 5,
    },
    {
        name: 'Sarah Smith',
        role: 'Tech Entrepreneur',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        content:
            "Best decision I've ever made. After 2 years of collaboration, I still can't think of any technical improvements I might need. The solutions are comprehensive and future-proof.",
        rating: 5,
    },
    {
        name: 'Michael Brown',
        role: 'Startup Founder',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        content:
            "Couldn't be happier with the results! You can tell that the architecture and features are well thought out and a lot of care was put into the development.",
        rating: 5,
    },
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isAnimating) {
                handleNext()
            }
        }, 5000)
        return () => clearInterval(timer)
    }, [isAnimating])

    const handleNext = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setTimeout(() => setIsAnimating(false), 500)
    }

    const handlePrev = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        )
        setTimeout(() => setIsAnimating(false), 500)
    }

    return (
        <section className="relative py-32 bg-gray-50 dark:bg-gray-800 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Loved by those who believe
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        in quality and innovation.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Testimonial Carousel */}
                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{
                                    duration: 0.5,
                                    ease: 'easeInOut',
                                }}
                                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-20 h-20 mb-6">
                                        <Image
                                            src={
                                                testimonials[currentIndex].image
                                            }
                                            alt={
                                                testimonials[currentIndex].name
                                            }
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="flex gap-1 mb-6">
                                        {[
                                            ...Array(
                                                testimonials[currentIndex]
                                                    .rating
                                            ),
                                        ].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className="w-5 h-5 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                    <blockquote className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
                                        "{testimonials[currentIndex].content}"
                                    </blockquote>
                                    <div className="text-gray-600 dark:text-gray-400">
                                        <p className="font-semibold">
                                            {testimonials[currentIndex].name}
                                        </p>
                                        <p>{testimonials[currentIndex].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (!isAnimating) {
                                        setIsAnimating(true)
                                        setCurrentIndex(index)
                                        setTimeout(
                                            () => setIsAnimating(false),
                                            500
                                        )
                                    }
                                }}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'bg-gray-900 dark:bg-white w-8'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform"
                        aria-label="Previous testimonial"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform"
                        aria-label="Next testimonial"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}
