import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingDock } from './FloatingDock'

export function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <FloatingDock />
            <Footer />
        </>
    )
} 