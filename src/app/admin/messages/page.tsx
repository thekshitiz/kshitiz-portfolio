'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface Message {
    id: string
    name: string
    email: string
    subject: string
    message: string
    createdAt: string
    status: 'PENDING' | 'READ' | 'REPLIED' | 'ARCHIVED'
}

export default function MessagesAdmin() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin')
        } else if (status === 'authenticated') {
            fetchMessages()
        }
    }, [status, router])

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/admin/messages')
            const data = await response.json()
            setMessages(data)
        } catch (error) {
            console.error('Failed to fetch messages:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Contact Messages
                </h1>
                <div className="grid gap-6">
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {message.subject}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            From: {message.name} (
                                            <a
                                                href={`mailto:${message.email}`}
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                {message.email}
                                            </a>
                                            )
                                        </p>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(
                                            message.createdAt
                                        ).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {message.message}
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center gap-4">
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full ${
                                            message.status === 'PENDING'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : message.status === 'READ'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : message.status === 'REPLIED'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {message.status}
                                    </span>
                                    <button
                                        onClick={() =>
                                            (window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`)
                                        }
                                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
