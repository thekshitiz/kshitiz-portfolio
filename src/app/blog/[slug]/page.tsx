'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { posts } from '@/lib/blog'

export default function BlogPost() {
    const { slug } = useParams()
    const post = posts.find((p) => p.slug === slug)

    if (!post) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Post not found
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        The blog post you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <article className="min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CalendarIcon className="h-5 w-5" />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString(
                                        'en-US',
                                        {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        }
                                    )}
                                </time>
                            </div>
                            <div className="flex items-center gap-1">
                                <ClockIcon className="h-5 w-5" />
                                <span>{post.readingTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        {post.content}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </article>
    )
}
