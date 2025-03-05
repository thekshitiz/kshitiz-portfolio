'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface ClientLayoutProps {
    children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
        </>
    )
}
