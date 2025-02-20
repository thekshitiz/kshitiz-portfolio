import { Metadata } from 'next'
import About from '@/components/About'
import { AboutHeader } from '@/components/AboutHeader'

export const metadata: Metadata = {
    title: 'About | Kshitiz Portfolio',
    description: 'Learn more about my journey, skills, and experience.',
}

export default function AboutPage() {
    return (
        <main className="py-24 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AboutHeader />
                <About />
            </div>
        </main>
    )
}
