import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        const body = await req.json()
        const { postId, event, metadata } = body

        const analytics = await prisma.analytics.create({
            data: {
                postId,
                userId: session?.user?.id,
                event,
                metadata,
                pageView: !event, // If no event is specified, it's a page view
            },
        })

        return NextResponse.json({ analytics }, { status: 201 })
    } catch (error) {
        console.error('Error tracking analytics:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const [dailyViews, monthlyViews, topPosts] = await Promise.all([
            // Get daily page views
            prisma.analytics.count({
                where: {
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                    pageView: true,
                },
            }),
            // Get monthly page views
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
            // Get top posts by views
            prisma.post.findMany({
                select: {
                    id: true,
                    title: true,
                    _count: {
                        select: {
                            analytics: {
                                where: {
                                    pageView: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    analytics: {
                        _count: 'desc',
                    },
                },
                take: 5,
            }),
        ])

        return NextResponse.json({
            dailyViews,
            monthlyViews,
            topPosts: topPosts.map((post) => ({
                id: post.id,
                title: post.title,
                views: post._count.analytics,
            })),
        })
    } catch (error) {
        console.error('Error fetching analytics:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
