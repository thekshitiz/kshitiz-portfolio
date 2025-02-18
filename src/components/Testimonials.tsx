'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
    StarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/20/solid'

const testimonials = [
    {
        name: 'John Doe',
        role: 'CEO at TechCorp',
        image: '/testimonials/john.jpg',
        content:
            'Working with Kshitiz was an absolute pleasure. Their technical expertise and attention to detail resulted in an outstanding product.',
        rating: 5,
    },
    {
        name: 'Sarah Smith',
        role: 'Product Manager',
        image: '/testimonials/sarah.jpg',
        content:
            'Exceptional work! They not only delivered the project on time but also provided valuable insights throughout the development process.',
        rating: 5,
    },
    {
        name: 'Michael Brown',
        role: 'Startup Founder',
        image: '/testimonials/michael.jpg',
        content:
            'Their ability to understand our requirements and translate them into a functional solution was impressive. Highly recommended!',
        rating: 5,
    },
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [autoplay, setAutoplay] = useState(true)

    useEffect(() => {
        if (!autoplay) return
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [autoplay])

    const handlePrevious = () => {
        setAutoplay(false)
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        )
    }

    const handleNext = () => {
        setAutoplay(false)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Client Testimonials
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Don't just take our word for it - hear what our clients
                        have to say about our work.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className="w-5 h-5 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                "{testimonial.content}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
