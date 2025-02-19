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
        const { approved } = body

        const comment = await prisma.comment.update({
            where: { id: params.id },
            data: { approved },
            select: {
                id: true,
                content: true,
                approved: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                post: {
                    select: {
                        title: true,
                    },
                },
            },
        })

        // Send email notification if comment is approved
        if (approved && comment.author.email) {
            // TODO: Implement email notification
            // await sendEmail({
            //     to: comment.author.email,
            //     subject: 'Your comment has been approved',
            //     text: `Your comment on "${comment.post.title}" has been approved.`,
            // })
        }

        return NextResponse.json({ comment })
    } catch (error) {
        console.error('Error updating comment:', error)
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

        await prisma.comment.delete({
            where: { id: params.id },
        })

        return NextResponse.json(
            { message: 'Comment deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error deleting comment:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
