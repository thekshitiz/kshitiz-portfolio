// This is a Server Component
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamically import the ResumeContent component with loading state
const ResumeContent = dynamic(() => import('./ResumeContent'), {
    loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white" />
        </div>
    ),
})

export const metadata: Metadata = {
    title: 'Resume | Kshitiz',
    description: 'View my professional experience and skills',
}

export default function ResumePage() {
    return <ResumeContent />
}
