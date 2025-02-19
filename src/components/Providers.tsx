'use client'

import { ThemeProvider } from '@/components/ThemeProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import Analytics from '@/components/Analytics'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <ErrorBoundary>
                {children}
                <Analytics />
            </ErrorBoundary>
        </ThemeProvider>
    )
}
