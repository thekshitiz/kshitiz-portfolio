'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
    CodeBracketIcon,
    DevicePhoneMobileIcon,
    ServerIcon,
    CircleStackIcon,
    SwatchIcon,
    LightBulbIcon,
} from '@heroicons/react/24/outline'

const services = [
    {
        title: 'Web Development',
        icon: CodeBracketIcon,
        description:
            'Building responsive and performant web applications using modern technologies.',
        skills: [
            'React/Next.js',
            'Performance Optimization',
            'SEO',
            'Responsive Design',
        ],
        color: 'from-blue-400 to-violet-400',
    },
    {
        title: 'Mobile Development',
        icon: DevicePhoneMobileIcon,
        description: 'Creating native and cross-platform mobile applications.',
        skills: [
            'React Native',
            'iOS/Android',
            'UI/UX Design',
            'App Store Deployment',
        ],
        color: 'from-emerald-400 to-cyan-400',
    },
    {
        title: 'Backend Development',
        icon: ServerIcon,
        description: 'Designing scalable server architectures and APIs.',
        skills: [
            'Node.js/Express',
            'Database Design',
            'API Development',
            'Cloud Services',
        ],
        color: 'from-orange-400 to-pink-400',
    },
    {
        title: 'DevOps',
        icon: CircleStackIcon,
        description: 'Implementing CI/CD pipelines and cloud infrastructure.',
        skills: ['AWS/Cloud', 'Docker/K8s', 'CI/CD', 'Monitoring'],
        color: 'from-purple-400 to-indigo-400',
    },
    {
        title: 'UI/UX Design',
        icon: SwatchIcon,
        description: 'Creating intuitive and beautiful user interfaces.',
        skills: [
            'Wireframing',
            'Prototyping',
            'User Research',
            'Design Systems',
        ],
        color: 'from-red-400 to-rose-400',
    },
    {
        title: 'Consulting',
        icon: LightBulbIcon,
        description: 'Technical consulting and architecture planning.',
        skills: [
            'Architecture Review',
            'Tech Stack Selection',
            'Performance Audit',
            'Best Practices',
        ],
        color: 'from-yellow-400 to-amber-400',
    },
]

export default function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section
            id="services"
            className="relative py-24 bg-[#F1EFE7] dark:bg-gray-900"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20 space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Services I Offer
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Comprehensive solutions to help your business grow and
                        succeed in the digital world.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative group"
                        >
                            <div className="relative h-full bg-white dark:bg-gray-800 p-8 rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
                                {/* Background Gradient */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                />

                                {/* Icon */}
                                <service.icon className="w-8 h-8 mb-6 text-gray-900 dark:text-white" />

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    {service.description}
                                </p>

                                {/* Skills */}
                                <div className="space-y-2">
                                    {service.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={
                                                hoveredIndex === index
                                                    ? { opacity: 1, x: 0 }
                                                    : { opacity: 0.7, x: 0 }
                                            }
                                            transition={{
                                                delay: skillIndex * 0.1,
                                            }}
                                            className="flex items-center space-x-2"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {skill}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
