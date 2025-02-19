import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequestWithAuth } from 'next-auth/middleware'
import { db } from '@/lib/db'

export default async function middleware(req: NextRequestWithAuth) {
    try {
        await db.$connect()
        const token = await getToken({ req })
        const isAuthenticated = !!token

        if (req.nextUrl.pathname.startsWith('/dashboard')) {
            if (!isAuthenticated) {
                const redirectUrl = new URL('/auth/signin', req.url)
                redirectUrl.searchParams.set(
                    'callbackUrl',
                    req.nextUrl.pathname
                )
                return NextResponse.redirect(redirectUrl)
            }
        }

        return NextResponse.next()
    } catch (error) {
        console.error('Middleware error:', error)
        return NextResponse.redirect(new URL('/error', req.url))
    } finally {
        await db.$disconnect()
    }
}

// Optional: Configure middleware to run on specific paths
export const config = {
    matcher: ['/dashboard/:path*'],
}
