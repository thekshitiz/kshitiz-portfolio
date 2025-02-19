import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const messages = await prisma.contactSubmission.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(messages)
    } catch (error) {
        console.error('Failed to fetch messages:', error)
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        )
    }
}
