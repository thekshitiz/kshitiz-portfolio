'use client'

import { motion } from 'framer-motion'

export default function About() {
    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8"
                >
                    About Me
                </motion.h2>
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8"
                    >
                        <video
                            className="w-full rounded-lg shadow-lg"
                            controls
                            poster="/video-thumbnail.jpg"
                        >
                            <source src="/intro-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-lg text-gray-700 dark:text-gray-300 mb-6"
                    >
                        Hello! I'm [Your Name], a passionate [Your Profession]
                        with [X] years of experience in [Your Field]. I
                        specialize in [Your Specialties] and love creating [Type
                        of Projects/Work].
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-lg text-gray-700 dark:text-gray-300 mb-6"
                    >
                        My journey in [Your Field] began [Brief Background].
                        Since then, I've had the opportunity to work with [Types
                        of Clients/Companies] and contribute to [Notable
                        Projects/Achievements].
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="text-lg text-gray-700 dark:text-gray-300"
                    >
                        When I'm not [Working/Coding/Designing], you can find me
                        [Your Hobbies/Interests]. I believe in [Your
                        Professional Philosophy/Approach], and I'm always
                        excited to take on new challenges and push the
                        boundaries of what's possible in [Your Field].
                    </motion.p>
                </div>
            </div>
        </section>
    )
} 