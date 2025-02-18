import { Metadata } from 'next'
import { BlogContent } from '@/components/BlogContent'

export const metadata: Metadata = {
    title: 'Blog | Kshitiz',
    description: 'Read my thoughts and tutorials on web development',
}

export default function BlogPage() {
    return <BlogContent />
}
