'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { FloatingDock } from './FloatingDock'

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
