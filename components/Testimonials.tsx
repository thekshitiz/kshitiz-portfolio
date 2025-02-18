'use client'

import { motion } from 'framer-motion'

const testimonials = [
    {
        name: 'John Doe',
        role: 'CEO, TechCorp',
        content:
            'Working with [Your Name] was an absolute pleasure. Their expertise and dedication to the project were evident throughout the process.',
    },
    {
        name: 'Jane Smith',
        role: 'Marketing Director, StartupX',
        content:
            '[Your Name] delivered exceptional results. Their creativity and attention to detail truly set them apart.',
    },
]

export default function Testimonials() {
    return (
        <section
            id="testimonials"
            className="py-20 bg-gray-50 dark:bg-gray-800"
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8"
                >
                    What Clients Say
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6"
                        >
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src="/placeholder.svg?height=40&width=40"
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
