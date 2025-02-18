'use client'

import { motion } from 'framer-motion'
import {
    CodeBracketIcon,
    CommandLineIcon,
    CubeIcon,
    DevicePhoneMobileIcon,
    RocketLaunchIcon,
    ServerIcon,
} from '@heroicons/react/24/outline'

const services = [
    {
        title: 'Web Development',
        description:
            'Building responsive and performant web applications using modern technologies.',
        icon: CodeBracketIcon,
        color: 'from-blue-400 to-blue-600',
    },
    {
        title: 'Mobile Development',
        description: 'Creating native and cross-platform mobile applications.',
        icon: DevicePhoneMobileIcon,
        color: 'from-purple-400 to-purple-600',
    },
    {
        title: 'Backend Development',
        description: 'Designing scalable server architectures and APIs.',
        icon: ServerIcon,
        color: 'from-green-400 to-green-600',
    },
    {
        title: 'DevOps',
        description: 'Implementing CI/CD pipelines and cloud infrastructure.',
        icon: CommandLineIcon,
        color: 'from-red-400 to-red-600',
    },
    {
        title: 'UI/UX Design',
        description: 'Creating intuitive and beautiful user interfaces.',
        icon: CubeIcon,
        color: 'from-yellow-400 to-yellow-600',
    },
    {
        title: 'Consulting',
        description: 'Technical consulting and architecture planning.',
        icon: RocketLaunchIcon,
        color: 'from-pink-400 to-pink-600',
    },
]

export default function Services() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Services
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Comprehensive solutions to help your business grow and
                        succeed in the digital world.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                        >
                            {/* Gradient Background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                            />

                            <div className="relative z-10">
                                <div className="mb-6">
                                    <service.icon className="w-12 h-12 text-gray-900 dark:text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
