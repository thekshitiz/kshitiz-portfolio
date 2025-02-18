import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Portfolio | Kshitiz',
    description: 'Explore my featured projects and work',
}

export default function PortfolioPage() {
    return (
        <main className="pt-24 min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
                {/* Add your portfolio content here */}
            </div>
        </main>
    )
}
