'use client'

import { motion } from 'framer-motion'
import { CodeBracketIcon, PaintBrushIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline'

const services = [
  {
    name: 'Web Development',
    description: 'Custom website development tailored to your needs.',
    icon: CodeBracketIcon,
  },
  {
    name: 'UI/UX Design',
    description: 'Creating intuitive and visually appealing user interfaces.',
    icon: PaintBrushIcon,
  },
  {
    name: 'Digital Strategy',
    description: 'Developing comprehensive digital strategies for your business.',
    icon: PresentationChartLineIcon,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8"
        >
          My Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <service.icon className="h-12 w-12 text-black dark:text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{service.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

