import Header from './Header'
import Footer from './Footer'

export function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
        </>
    )
}
