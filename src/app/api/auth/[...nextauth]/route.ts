import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Hardcoded admin credentials
                if (
                    credentials?.email === 'admin@admin.com' &&
                    credentials?.password === 'admin123'
                ) {
                    return {
                        id: '1',
                        email: 'admin@admin.com',
                        name: 'Admin User',
                        role: 'ADMIN',
                    }
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role
                session.user.id = token.id
            }
            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
    },
})

export { handler as GET, handler as POST }
