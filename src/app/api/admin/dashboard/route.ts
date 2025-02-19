import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { subDays, format } from 'date-fns'

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const timeframe = url.searchParams.get('timeframe') || 'week'
        const daysToSubtract =
            timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365
        const startDate = subDays(new Date(), daysToSubtract)

        // Fetch basic stats
        const [users, posts, comments, messages, views, likes] =
            await Promise.all([
                prisma.user.count(),
                prisma.post.count(),
                prisma.comment.count(),
                prisma.contactSubmission.count(),
                prisma.analytics.count({ where: { event: 'VIEW' } }),
                prisma.analytics.count({ where: { event: 'LIKE' } }),
            ])

        // Fetch analytics data
        const analyticsData = await prisma.analytics.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: {
                    gte: startDate,
                },
            },
            _count: {
                id: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })

        // Generate dates array
        const dates = Array.from({ length: daysToSubtract }, (_, i) => {
            return format(subDays(new Date(), i), 'MMM dd')
        }).reverse()

        // Calculate growth rate
        const previousPeriodPosts = await prisma.post.count({
            where: {
                createdAt: {
                    lt: startDate,
                    gte: subDays(startDate, daysToSubtract),
                },
            },
        })
        const currentPeriodPosts = await prisma.post.count({
            where: {
                createdAt: {
                    gte: startDate,
                },
            },
        })
        const growthRate =
            previousPeriodPosts === 0
                ? 100
                : ((currentPeriodPosts - previousPeriodPosts) /
                      previousPeriodPosts) *
                  100

        return NextResponse.json({
            stats: {
                totalUsers: users,
                totalPosts: posts,
                totalComments: comments,
                totalMessages: messages,
                totalViews: views,
                totalLikes: likes,
                growthRate: Math.round(growthRate * 100) / 100,
            },
            analytics: {
                dates,
                views: dates.map(() => Math.floor(Math.random() * 1000)), // Replace with real data
                likes: dates.map(() => Math.floor(Math.random() * 100)), // Replace with real data
                comments: dates.map(() => Math.floor(Math.random() * 50)), // Replace with real data
            },
            // ... rest of the response
        })
    } catch (error) {
        console.error('Dashboard stats error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        )
    }
}
