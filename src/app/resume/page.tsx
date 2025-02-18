import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Resume | Kshitiz',
    description: 'View my professional experience and skills',
}

export default function ResumePage() {
    return (
        <main className="pt-24 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Resume</h1>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Download PDF
                    </a>
                </div>
                {/* Add your resume content here */}
            </div>
        </main>
    )
}
