import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
}

// Create the PrismaClient instance
const prismaClient =
    globalThis.prisma ||
    new PrismaClient({
        log: ['query', 'error', 'warn'],
    })

// Set the global prisma in development
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prismaClient
}

// Database helper functions
const db = {
    // Core client
    client: prismaClient,

    // Connection helpers
    async connect() {
        try {
            await prismaClient.$connect()
            console.log('✅ Database connected successfully')
        } catch (error) {
            console.error('❌ Database connection failed:', error)
            throw error
        }
    },

    async disconnect() {
        await prismaClient.$disconnect()
    },

    // User operations
    user: {
        getById: async (id: string) => {
            return prismaClient.user.findUnique({
                where: { id },
            })
        },
        getByEmail: async (email: string) => {
            return prismaClient.user.findUnique({
                where: { email },
            })
        },
        create: async (data: any) => {
            return prismaClient.user.create({
                data,
            })
        },
        update: async (id: string, data: any) => {
            return prismaClient.user.update({
                where: { id },
                data,
            })
        },
    },

    // Blog operations
    blog: {
        create: async (data: any) => {
            return prismaClient.blog.create({ data })
        },
        findMany: async (options?: any) => {
            return prismaClient.blog.findMany(options)
        },
        count: async (where?: any) => {
            return prismaClient.blog.count({ where })
        },
    },

    // Project operations
    project: {
        create: async (data: any) => {
            return prismaClient.project.create({ data })
        },
        findMany: async (options?: any) => {
            return prismaClient.project.findMany(options)
        },
        count: async (where?: any) => {
            return prismaClient.project.count({ where })
        },
    },
}

export { db }
