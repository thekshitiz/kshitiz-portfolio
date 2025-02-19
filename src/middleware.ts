import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const session = await getToken({ req: request })

        if (!session || session.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/auth/signin', request.url))
        }
    }

    return NextResponse.next()
}

// Optional: Configure middleware to run on specific paths
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/admin/:path*',
    ],
}
