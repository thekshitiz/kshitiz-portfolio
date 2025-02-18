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
        id: 1,
        content:
            'Working with Kshitiz was an absolute pleasure. His technical expertise and attention to detail transformed our ideas into a stunning reality. The development process was smooth, and the end result exceeded our expectations.',
        author: {
            name: 'Sarah Johnson',
            role: 'CTO',
            company: 'TechCorp',
            image: '/testimonials/sarah.jpg',
            companyLogo: '/companies/techcorp.svg',
        },
        rating: 5,
    },
    {
        id: 2,
        content:
            "Kshitiz's ability to understand our requirements and deliver high-quality solutions is remarkable. His expertise in modern web technologies helped us create a seamless user experience.",
        author: {
            name: 'Michael Chen',
            role: 'Product Manager',
            company: 'InnovateLabs',
            image: '/testimonials/michael.jpg',
            companyLogo: '/companies/innovatelabs.svg',
        },
        rating: 5,
    },
    {
        id: 3,
        content:
            'The attention to detail and commitment to quality is outstanding. Kshitiz not only delivered what we asked for but also suggested improvements that made our product even better.',
        author: {
            name: 'Emily Rodriguez',
            role: 'Founder',
            company: 'DesignStudio',
            image: '/testimonials/emily.jpg',
            companyLogo: '/companies/designstudio.svg',
        },
        rating: 5,
    },
    {
        id: 4,
        content:
            'Exceptional problem-solving skills and a great communicator. Kshitiz helped us modernize our tech stack and implement best practices that significantly improved our development workflow.',
        author: {
            name: 'David Kim',
            role: 'Lead Developer',
            company: 'CodeCraft',
            image: '/testimonials/david.jpg',
            companyLogo: '/companies/codecraft.svg',
        },
        rating: 5,
    },
    {
        id: 5,
        content:
            'A true professional who delivers results. His deep understanding of both frontend and backend technologies made him the perfect choice for our complex project requirements.',
        author: {
            name: 'Lisa Martinez',
            role: 'Project Manager',
            company: 'WebSolutions',
            image: '/testimonials/lisa.jpg',
            companyLogo: '/companies/websolutions.svg',
        },
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
        <section
            id="testimonials"
            className="py-20 bg-gray-50 dark:bg-gray-900"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        What Clients Say
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Don&apos;t just take our word for it - hear from some of
                        our satisfied clients
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Carousel Navigation */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-10 px-4">
                        <button
                            onClick={handlePrevious}
                            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRightIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Testimonial Cards */}
                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative"
                            >
                                {/* Quote Icon */}
                                <div className="absolute -top-4 right-8">
                                    <span className="text-6xl text-blue-500 opacity-20">
                                        "
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`h-5 w-5 ${
                                                i <
                                                testimonials[currentIndex]
                                                    .rating
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                                    {testimonials[currentIndex].content}
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center">
                                    <div className="relative h-12 w-12 mr-4">
                                        <Image
                                            src={
                                                testimonials[currentIndex]
                                                    .author.image
                                            }
                                            alt={
                                                testimonials[currentIndex]
                                                    .author.name
                                            }
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {
                                                testimonials[currentIndex]
                                                    .author.name
                                            }
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {
                                                testimonials[currentIndex]
                                                    .author.role
                                            }{' '}
                                            at{' '}
                                            {
                                                testimonials[currentIndex]
                                                    .author.company
                                            }
                                        </p>
                                    </div>
                                    {/* Company Logo */}
                                    <div className="ml-auto relative h-8 w-24">
                                        <Image
                                            src={
                                                testimonials[currentIndex]
                                                    .author.companyLogo
                                            }
                                            alt={
                                                testimonials[currentIndex]
                                                    .author.company
                                            }
                                            fill
                                            className="object-contain dark:invert"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setAutoplay(false)
                                    setCurrentIndex(index)
                                }}
                                className={`h-2 rounded-full transition-all ${
                                    index === currentIndex
                                        ? 'w-8 bg-blue-500'
                                        : 'w-2 bg-gray-300 dark:bg-gray-700'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
