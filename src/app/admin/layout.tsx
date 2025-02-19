'use client'

import { SessionProvider } from 'next-auth/react'
import AdminDashboardLayout from './AdminDashboardLayout'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <AdminDashboardLayout>{children}</AdminDashboardLayout>
        </SessionProvider>
    )
}
