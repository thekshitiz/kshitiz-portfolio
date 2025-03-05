import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequestWithAuth } from 'next-auth/middleware'

export default async function middleware(req: NextRequestWithAuth) {
    try {
        const token = await getToken({ req })

        // Protect admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
            if (!token || token.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/auth/login', req.url))
            }
        }

        return NextResponse.next()
    } catch (error) {
        console.error('Middleware error:', error)
        return NextResponse.redirect(new URL('/auth/error', req.url))
    }
}

export const config = {
    matcher: ['/admin/:path*'],
}
