import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const [
            totalPosts,
            totalComments,
            totalUsers,
            viewsToday,
            viewsThisMonth,
        ] = await Promise.all([
            prisma.post.count(),
            prisma.comment.count(),
            prisma.user.count(),
            prisma.analytics.count({
                where: {
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                    pageView: true,
                },
            }),
            prisma.analytics.count({
                where: {
                    createdAt: {
                        gte: new Date(
                            new Date().setMonth(new Date().getMonth() - 1)
                        ),
                    },
                    pageView: true,
                },
            }),
        ])

        return NextResponse.json({
            totalPosts,
            totalComments,
            totalUsers,
            viewsToday,
            viewsThisMonth,
        })
    } catch (error) {
        console.error('Error fetching admin stats:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
