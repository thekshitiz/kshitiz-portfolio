import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query', 'error', 'warn'],
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
        connection: {
            ssl: { rejectUnauthorized: false },
        },
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Test connection with better error handling
export async function testConnection() {
    try {
        await prisma.$connect()
        // Test a simple query
        const result = await prisma.$executeRaw`SELECT 1 as test`
        console.log('Database connection successful:', result)
        return true
    } catch (error) {
        console.error('Database connection failed:', error)
        if (error instanceof Error) {
            console.error('Error message:', error.message)
            console.error('Error stack:', error.stack)
        }
        return false
    }
}
