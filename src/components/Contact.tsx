'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    UserIcon,
    ChatBubbleLeftRightIcon,
    PencilSquareIcon,
    PaperAirplaneIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline'

// Predefined subject types for data analysis
const subjectTypes = [
    {
        label: 'Project Collaboration',
        value: 'collaboration',
        description: 'Discuss potential project partnerships',
    },
    {
        label: 'Job Opportunity',
        value: 'job',
        description: 'Full-time positions or freelance work',
    },
    {
        label: 'Technical Consultation',
        value: 'consultation',
        description: 'Get expert advice on technical matters',
    },
    {
        label: 'Bug Report',
        value: 'bug',
        description: 'Report issues with existing projects',
    },
    {
        label: 'Feature Request',
        value: 'feature',
        description: 'Suggest new features or improvements',
    },
    {
        label: 'Other',
        value: 'other',
        description: 'Any other inquiries',
    },
]

type SubjectType = (typeof subjectTypes)[number]['value'] | string

interface FormData {
    name: string
    email: string
    subject: string
    message: string
    customSubject?: string
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [status, setStatus] = useState({
        isSubmitting: false,
        isSuccess: false,
        isError: false,
        message: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus({
            isSubmitting: true,
            isSuccess: false,
            isError: false,
            message: '',
        })

        // Log the form data before sending
        console.log('Submitting form data:', formData)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject:
                        formData.subject === 'other'
                            ? formData.customSubject || 'Other'
                            : subjectTypes.find(
                                  (type) => type.value === formData.subject
                              )?.label || formData.subject,
                    message: formData.message,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message')
            }

            setStatus({
                isSubmitting: false,
                isSuccess: true,
                isError: false,
                message:
                    'Message sent successfully! We will get back to you soon.',
            })

            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            })
        } catch (error) {
            setStatus({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Failed to send message. Please try again.',
            })
        }
    }

    return (
        <div id="contact" className="min-h-screen">
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            We're here to help with any questions or concerns
                            you may have.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
                        >
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                Send us a message
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject*
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    subject: e.target.value,
                                                })
                                            }
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none bg-white dark:bg-gray-800"
                                            required
                                        >
                                            <option value="">
                                                Select a subject
                                            </option>
                                            {subjectTypes.map((type) => (
                                                <option
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                                            <ChevronDownIcon className="h-5 w-5" />
                                        </div>
                                    </div>
                                    {formData.subject && (
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            {
                                                subjectTypes.find(
                                                    (type) =>
                                                        type.value ===
                                                        formData.subject
                                                )?.description
                                            }
                                        </p>
                                    )}
                                </div>
                                {formData.subject === 'other' && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Specify Subject*
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <PencilSquareIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={
                                                    formData.customSubject || ''
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        customSubject:
                                                            e.target.value,
                                                    })
                                                }
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="Please specify your subject"
                                                required={
                                                    formData.subject === 'other'
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Message
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <PencilSquareIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    message: e.target.value,
                                                })
                                            }
                                            rows={4}
                                            className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                                            required
                                        />
                                    </div>
                                </div>
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-lg mb-6 ${
                                            status.isSuccess
                                                ? 'bg-green-50 text-green-800'
                                                : 'bg-red-50 text-red-800'
                                        }`}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={status.isSubmitting}
                                    className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {status.isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <PaperAirplaneIcon className="h-5 w-5 transform rotate-90 -translate-y-px" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Contact Information
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <EnvelopeIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Email
                                            </p>
                                            <a
                                                href="mailto:contact@yourname.com"
                                                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                            >
                                                thekshitizrai@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <PhoneIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Phone
                                            </p>
                                            <a
                                                href="tel:+1234567890"
                                                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                            >
                                                +977-9818180198
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <MapPinIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Address
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Triyuga-10,
                                                <br />
                                                Udayapur, Koshi 56300,
                                                <br />
                                                Nepal
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map or Additional Information */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Office Hours
                                </h3>
                                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
