export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    date: string
    readTime: string
    categories: string[]
    tags: string[]
    image: string
    slug: string
    author: {
        name: string
        image: string
    }
}

export const posts: BlogPost[] = [
    {
        id: '1',
        title: 'Building Scalable Web Applications with Next.js',
        excerpt:
            'Learn how to build and deploy scalable web applications using Next.js, React, and modern deployment techniques.',
        content: '...', // Full content here
        date: '2024-02-18',
        readTime: '12 min read',
        categories: ['Web Development', 'Next.js'],
        tags: ['Next.js', 'React', 'Performance', 'Deployment'],
        image: '/blog/nextjs-scaling.jpg',
        slug: 'building-scalable-nextjs-apps',
        author: {
            name: 'Kshitiz',
            image: '/images/avatar.jpg',
        },
    },
    {
        id: '2',
        title: 'Advanced TypeScript Patterns for Frontend Development',
        excerpt:
            'Explore advanced TypeScript patterns and techniques to write more maintainable and type-safe frontend code.',
        content: '...', // Full content here
        date: '2024-02-15',
        readTime: '15 min read',
        categories: ['TypeScript', 'Frontend'],
        tags: ['TypeScript', 'Frontend', 'Best Practices', 'Development'],
        image: '/blog/typescript-patterns.jpg',
        slug: 'advanced-typescript-patterns',
        author: {
            name: 'Kshitiz',
            image: '/images/avatar.jpg',
        },
    },
]
