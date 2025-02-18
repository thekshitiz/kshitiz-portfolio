'use client'

import { motion } from 'framer-motion'

export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8"
                >
                    Get in Touch
                </motion.h2>
                {/* Add your contact form or content here */}
            </div>
        </section>
    )
}
