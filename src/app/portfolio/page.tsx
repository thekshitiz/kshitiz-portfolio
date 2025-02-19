import { Metadata } from 'next'
import { PortfolioContent } from '@/components/PortfolioContent'

export const metadata: Metadata = {
    title: 'Portfolio | Kshitiz',
    description: 'Explore my latest projects and work',
}

export default function PortfolioPage() {
    return <PortfolioContent />
}
