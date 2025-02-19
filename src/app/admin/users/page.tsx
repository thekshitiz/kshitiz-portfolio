'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    UserPlusIcon,
    PencilIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'

interface User {
    id: string
    name: string
    email: string
    role: 'ADMIN' | 'AUTHOR' | 'USER'
    createdAt: string
    emailVerified: boolean
    image?: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/admin/users')
                if (!response.ok) throw new Error('Failed to fetch users')
                const data = await response.json()
                setUsers(data)
            } catch (error) {
                console.error('Failed to fetch users:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return

        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete user')
            setUsers((prev) => prev.filter((user) => user.id !== userId))
        } catch (error) {
            console.error('Failed to delete user:', error)
        }
    }

    const UserRow = ({ user }: { user: User }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                {user.name[0].toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                                user.role === 'ADMIN'
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                                    : user.role === 'AUTHOR'
                                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                            }`}
                    >
                        {user.role}
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setSelectedUser(user)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                    {user.emailVerified ? (
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                        <XCircleIcon className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    {user.emailVerified ? 'Verified' : 'Not Verified'}
                </span>
                <span>•</span>
                <span>
                    Joined {format(new Date(user.createdAt), 'MMM d, yyyy')}
                </span>
            </div>
        </motion.div>
    )

    const CreateUserModal = () => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            role: 'USER' as const,
            password: '',
        })
        const [error, setError] = useState('')

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
            setError('')

            try {
                const response = await fetch('/api/admin/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })

                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.error || 'Failed to create user')
                }

                const newUser = await response.json()
                setUsers((prev) => [...prev, newUser])
                setIsCreateModalOpen(false)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to create user'
                )
            }
        }

        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Create New User
                    </h2>
                    {error && (
                        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Role
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        role: e.target.value as
                                            | 'ADMIN'
                                            | 'AUTHOR'
                                            | 'USER',
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="USER">User</option>
                                <option value="AUTHOR">Author</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                            >
                                Create User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Users
                </h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Add User
                </button>
            </div>

            <div className="space-y-4">
                {users.map((user) => (
                    <UserRow key={user.id} user={user} />
                ))}
            </div>

            {isCreateModalOpen && <CreateUserModal />}
        </div>
    )
}
