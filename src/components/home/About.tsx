'use client'

import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { gradients } from '@/lib/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
    return (
        <Section>
            <SectionTitle
                title="About Me"
                subtitle="I'm a full-stack developer passionate about creating beautiful and functional web applications"
                gradient={`${gradients.accent} ${gradients.accentDark}`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        With over 5 years of experience in web development, I
                        specialize in building modern, responsive, and
                        user-friendly applications.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Frontend
                            </h3>
                            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                                <li>React</li>
                                <li>Next.js</li>
                                <li>TailwindCSS</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Backend
                            </h3>
                            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                                <li>Node.js</li>
                                <li>PostgreSQL</li>
                                <li>Prisma</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative h-[400px] rounded-xl overflow-hidden"
                >
                    <Image
                        src="public/profile.png"
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </Section>
    )
}
