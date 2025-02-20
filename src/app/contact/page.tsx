import { Metadata } from 'next'
import Contact from '@/components/Contact'
import { ContactHeader } from '@/components/ContactHeader'

export const metadata: Metadata = {
    title: 'Contact | Kshitiz Portfolio',
    description:
        'Get in touch with me for collaborations, opportunities, or just to say hello.',
}

export default function ContactPage() {
    return (
        <main className="py-24 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ContactHeader />
                <Contact />
            </div>
        </main>
    )
}
