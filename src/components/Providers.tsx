'use client'

import { ThemeProvider } from '@/components/ThemeProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import Analytics from '@/components/Analytics'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <ErrorBoundary>
                    {children}
                    <Analytics />
                </ErrorBoundary>
            </ThemeProvider>
        </SessionProvider>
    )
}
