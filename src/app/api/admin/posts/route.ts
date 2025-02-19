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

        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                published: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ posts })
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await req.json()
        const { title, content, excerpt, categories, tags, coverImage } = body

        const post = await prisma.post.create({
            data: {
                title,
                content,
                excerpt,
                coverImage,
                author: {
                    connect: {
                        id: session.user.id,
                    },
                },
                categories: {
                    connectOrCreate: categories.map((name: string) => ({
                        where: { name },
                        create: {
                            name,
                            slug: name.toLowerCase().replace(/\s+/g, '-'),
                        },
                    })),
                },
                tags: {
                    connectOrCreate: tags.map((name: string) => ({
                        where: { name },
                        create: {
                            name,
                            slug: name.toLowerCase().replace(/\s+/g, '-'),
                        },
                    })),
                },
            },
        })

        return NextResponse.json({ post }, { status: 201 })
    } catch (error) {
        console.error('Error creating post:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
