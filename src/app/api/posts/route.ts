import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const category = searchParams.get('category')
        const tag = searchParams.get('tag')
        const search = searchParams.get('search')

        const where: Prisma.PostWhereInput = {
            published: true,
            ...(category && {
                categories: {
                    some: {
                        slug: category,
                    },
                },
            }),
            ...(tag && {
                tags: {
                    some: {
                        slug: tag,
                    },
                },
            }),
            ...(search && {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: 'insensitive' as Prisma.QueryMode,
                        },
                    },
                    {
                        content: {
                            contains: search,
                            mode: 'insensitive' as Prisma.QueryMode,
                        },
                    },
                ],
            }),
        }

        const result = await db.post.getAll({ page, limit, where })
        return NextResponse.json(result)
    } catch (error) {
        console.error('Failed to fetch posts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
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

        const data = await req.json()
        // Add validation here

        const post = await db.post.create({
            ...data,
            author: {
                connect: { email: session.user.email! },
            },
        })

        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        console.error('Failed to create post:', error)
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        )
    }
}
