'use client'

import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FloatingDock } from '@/components/FloatingDock'

interface ClientLayoutProps {
    children: ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <FloatingDock />
            <Footer />
        </>
    )
}
