'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'

// Social icons
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa'

interface FormData {
    email: string
    password: string
}

export default function SignIn() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Check if user just registered
    const justRegistered = searchParams.get('registered') === 'true'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            })

            if (result?.error) {
                setError('Invalid email or password')
                return
            }

            router.push('/dashboard')
        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    }

    const socialButtonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: 'easeInOut',
            },
        },
        tap: {
            scale: 0.95,
        },
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-md w-full"
            >
                {/* Success Message */}
                {justRegistered && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-700 dark:text-green-200"
                    >
                        Registration successful! Please sign in to continue.
                    </motion.div>
                )}

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-8 pt-8 pb-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Sign in to continue your journey
                            </p>
                        </motion.div>

                        {/* Social Sign-in Buttons */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <motion.button
                                variants={socialButtonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => signIn('google')}
                                className="flex items-center justify-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <FaGoogle className="w-5 h-5 text-red-500" />
                            </motion.button>
                            <motion.button
                                variants={socialButtonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => signIn('github')}
                                className="flex items-center justify-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <FaGithub className="w-5 h-5 text-gray-900 dark:text-white" />
                            </motion.button>
                            <motion.button
                                variants={socialButtonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => signIn('facebook')}
                                className="flex items-center justify-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <FaFacebook className="w-5 h-5 text-blue-600" />
                            </motion.button>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Sign-in Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </span>
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-blue-600 hover:text-blue-500 font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span className="ml-2">
                                            Signing in...
                                        </span>
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </motion.button>
                        </form>
                    </div>

                    <div className="px-8 py-4 bg-gray-50 dark:bg-gray-800/50 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                href="/auth/register"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Create one now
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
