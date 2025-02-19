'use client'

import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { gradients } from '@/lib/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const posts = [
    {
        title: 'Building a Modern Web Application',
        excerpt: 'Learn how to build a full-stack application with Next.js 13',
        image: '/blog/modern-web.jpg',
        date: '2023-12-01',
        slug: 'building-modern-web-app',
    },
    // Add more posts...
]

export default function FeaturedPosts() {
    return (
        <Section>
            <SectionTitle
                title="Featured Posts"
                subtitle="Latest insights and articles"
                gradient={`${gradients.primary} ${gradients.primaryDark}`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Link href={`/blog/${post.slug}`}>
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {post.excerpt}
                                </p>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(post.date).toLocaleDateString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }
                                    )}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
