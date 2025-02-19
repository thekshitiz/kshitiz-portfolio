import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const BlogSchema = z.object({
    title: z.string().min(1).max(100),
    excerpt: z.string().min(1).max(300),
    content: z.string().min(1),
    status: z.enum(['draft', 'published']),
})

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const blog = await db.blog.findUnique({
            where: { id: params.id },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        })

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(blog)
    } catch (error) {
        console.error('Failed to fetch blog:', error)
        return NextResponse.json(
            { error: 'Failed to fetch blog' },
            { status: 500 }
        )
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const validatedData = BlogSchema.parse(body)

        const blog = await db.blog.update({
            where: { id: params.id },
            data: {
                ...validatedData,
                publishedAt:
                    validatedData.status === 'published' ? new Date() : null,
            },
        })

        return NextResponse.json(blog)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }
        console.error('Failed to update blog:', error)
        return NextResponse.json(
            { error: 'Failed to update blog' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await db.blog.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to delete blog:', error)
        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 }
        )
    }
}
