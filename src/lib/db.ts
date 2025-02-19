import { prisma } from './prisma'
import { Prisma } from '@prisma/client'

export const db = {
    // User operations
    user: {
        getById: async (id: string) => {
            return prisma.user.findUnique({
                where: { id },
            })
        },
        getByEmail: async (email: string) => {
            return prisma.user.findUnique({
                where: { email },
            })
        },
        create: async (data: Prisma.UserCreateInput) => {
            return prisma.user.create({
                data,
            })
        },
        update: async (id: string, data: Prisma.UserUpdateInput) => {
            return prisma.user.update({
                where: { id },
                data,
            })
        },
    },

    // Post operations
    post: {
        getAll: async (options?: {
            page?: number
            limit?: number
            where?: Prisma.PostWhereInput
        }) => {
            const { page = 1, limit = 10, where = {} } = options || {}
            const skip = (page - 1) * limit

            const [posts, total] = await Promise.all([
                prisma.post.findMany({
                    where,
                    include: {
                        author: {
                            select: {
                                name: true,
                                image: true,
                            },
                        },
                        categories: true,
                        tags: true,
                        _count: {
                            select: {
                                comments: true,
                                likes: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    skip,
                    take: limit,
                }),
                prisma.post.count({ where }),
            ])

            return {
                posts,
                total,
                pages: Math.ceil(total / limit),
            }
        },
        getById: async (id: string) => {
            return prisma.post.findUnique({
                where: { id },
                include: {
                    author: true,
                    categories: true,
                    tags: true,
                    comments: {
                        include: {
                            author: true,
                            replies: {
                                include: {
                                    author: true,
                                },
                            },
                        },
                        where: {
                            parentId: null, // Only get top-level comments
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                    _count: {
                        select: {
                            likes: true,
                            bookmarks: true,
                        },
                    },
                },
            })
        },
        create: async (data: Prisma.PostCreateInput) => {
            return prisma.post.create({
                data,
                include: {
                    author: true,
                    categories: true,
                    tags: true,
                },
            })
        },
    },

    // Category operations
    category: {
        getAll: async () => {
            return prisma.category.findMany()
        },
        create: async (data: any) => {
            return prisma.category.create({
                data,
            })
        },
    },

    // Analytics operations
    analytics: {
        trackPageView: async (data: any) => {
            return prisma.analytics.create({
                data: {
                    ...data,
                    pageView: true,
                },
            })
        },
    },
}
