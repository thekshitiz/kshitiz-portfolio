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
        gradient: 'from-blue-400 to-indigo-600',
        features: [
            'React/Next.js',
            'Performance Optimization',
            'SEO',
            'Responsive Design',
        ],
    },
    {
        title: 'Mobile Development',
        description: 'Creating native and cross-platform mobile applications.',
        icon: DevicePhoneMobileIcon,
        gradient: 'from-purple-400 to-pink-600',
        features: [
            'React Native',
            'iOS/Android',
            'UI/UX Design',
            'App Store Deployment',
        ],
    },
    {
        title: 'Backend Development',
        description: 'Designing scalable server architectures and APIs.',
        icon: ServerIcon,
        gradient: 'from-green-400 to-emerald-600',
        features: [
            'Node.js/Express',
            'Database Design',
            'API Development',
            'Cloud Services',
        ],
    },
    {
        title: 'DevOps',
        description: 'Implementing CI/CD pipelines and cloud infrastructure.',
        icon: CommandLineIcon,
        gradient: 'from-red-400 to-rose-600',
        features: ['AWS/Cloud', 'Docker/K8s', 'CI/CD', 'Monitoring'],
    },
    {
        title: 'UI/UX Design',
        description: 'Creating intuitive and beautiful user interfaces.',
        icon: CubeIcon,
        gradient: 'from-amber-400 to-orange-600',
        features: [
            'Wireframing',
            'Prototyping',
            'User Research',
            'Design Systems',
        ],
    },
    {
        title: 'Consulting',
        description: 'Technical consulting and architecture planning.',
        icon: RocketLaunchIcon,
        gradient: 'from-cyan-400 to-teal-600',
        features: [
            'Architecture Review',
            'Tech Stack Selection',
            'Performance Audit',
            'Best Practices',
        ],
    },
]

export default function Services() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Services I Offer
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
                            whileHover={{ y: -5 }}
                            className="group relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Gradient Border */}
                            <div
                                className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ padding: '1px' }}
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="h-full w-full bg-white dark:bg-gray-900 rounded-2xl" />
                            </div>

                            <div className="relative">
                                {/* Icon with gradient background */}
                                <div
                                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.gradient} p-3 mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <service.icon className="w-full h-full text-white" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {service.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-2">
                                    {service.features.map((feature, i) => (
                                        <motion.li
                                            key={feature}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.1 + i * 0.1,
                                            }}
                                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-2`}
                                            />
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
