import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'

export async function authMiddleware(req: Request) {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return session
}

export async function adminMiddleware(req: Request) {
    const session = await authMiddleware(req)
    
    if (session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    return session
} 