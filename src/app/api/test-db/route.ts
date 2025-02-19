import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Basic connection test
        const result = await prisma.$executeRaw`SELECT 1 as test`

        // Test if we can access the public schema
        const schemaTest = await prisma.$executeRaw`
            SELECT current_database() as database, 
                   current_schema() as schema,
                   current_user as user
        `

        return NextResponse.json({
            status: 'Connected to database',
            connectionTest: result,
            databaseInfo: schemaTest,
        })
    } catch (error) {
        console.error('Database connection error:', error)
        return NextResponse.json(
            {
                error: 'Failed to connect to database',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
                hint: 'Check your DATABASE_URL and Supabase connection settings',
            },
            { status: 500 }
        )
    }
}
