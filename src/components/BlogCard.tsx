'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import type { Post } from '@/lib/blog'

interface BlogCardProps {
    post: Post
    index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
        >
            <div className="relative h-48">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </time>
                    </div>
                    <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{post.readingTime}</span>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                    >
                        {post.title}
                    </Link>
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                        <span
                            key={category}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300"
                        >
                            {category}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {post.author.name}
                        </span>
                    </div>
                    <Link
                        href={`/blog/${post.slug}`}
                        className="text-black dark:text-white font-medium hover:underline"
                    >
                        Read More →
                    </Link>
                </div>
            </div>
        </motion.article>
    )
}
