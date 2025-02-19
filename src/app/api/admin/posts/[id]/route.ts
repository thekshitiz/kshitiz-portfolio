import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await req.json()
        const {
            published,
            title,
            content,
            excerpt,
            categories,
            tags,
            coverImage,
        } = body

        const updateData: any = {}

        if (published !== undefined) updateData.published = published
        if (title) updateData.title = title
        if (content) updateData.content = content
        if (excerpt) updateData.excerpt = excerpt
        if (coverImage) updateData.coverImage = coverImage

        if (categories) {
            updateData.categories = {
                set: [], // First disconnect all categories
                connectOrCreate: categories.map((name: string) => ({
                    where: { name },
                    create: {
                        name,
                        slug: name.toLowerCase().replace(/\s+/g, '-'),
                    },
                })),
            }
        }

        if (tags) {
            updateData.tags = {
                set: [], // First disconnect all tags
                connectOrCreate: tags.map((name: string) => ({
                    where: { name },
                    create: {
                        name,
                        slug: name.toLowerCase().replace(/\s+/g, '-'),
                    },
                })),
            }
        }

        const post = await prisma.post.update({
            where: { id: params.id },
            data: updateData,
        })

        return NextResponse.json({ post })
    } catch (error) {
        console.error('Error updating post:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        await prisma.post.delete({
            where: { id: params.id },
        })

        return NextResponse.json(
            { message: 'Post deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error deleting post:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
