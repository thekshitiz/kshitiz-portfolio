import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { z } from 'zod'

// Validation schema for blog posts
const BlogSchema = z.object({
    title: z.string().min(1).max(100),
    excerpt: z.string().min(1).max(300),
    content: z.string().min(1),
    status: z.enum(['draft', 'published']),
})

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const status = searchParams.get('status')

        const where = status ? { status } : {}

        const [blogs, total] = await Promise.all([
            db.blog.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    excerpt: true,
                    status: true,
                    publishedAt: true,
                    views: true,
                },
            }),
            db.blog.count({ where }),
        ])

        return NextResponse.json({
            blogs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Failed to fetch blogs:', error)
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const validatedData = BlogSchema.parse(body)

        const blog = await db.blog.create({
            data: {
                ...validatedData,
                authorId: session.user.id,
                publishedAt:
                    validatedData.status === 'published' ? new Date() : null,
            },
        })

        return NextResponse.json(blog, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }
        console.error('Failed to create blog:', error)
        return NextResponse.json(
            { error: 'Failed to create blog' },
            { status: 500 }
        )
    }
}
