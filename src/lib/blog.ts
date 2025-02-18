export interface Post {
    id: number
    title: string
    slug: string
    excerpt: string
    content: string
    date: string
    author: {
        name: string
        avatar: string
    }
    categories: string[]
    tags: string[]
    coverImage: string
    readingTime: string
}

export const posts: Post[] = [
    {
        id: 1,
        title: 'Getting Started with Next.js 13',
        slug: 'getting-started-with-nextjs-13',
        excerpt:
            'Learn how to build modern web applications with Next.js 13 and its new app directory structure.',
        content: 'Full blog post content here...',
        date: '2024-03-15',
        author: {
            name: 'Your Name',
            avatar: '/avatar.jpg',
        },
        categories: ['Web Development', 'React', 'Next.js'],
        tags: ['nextjs', 'react', 'javascript', 'tutorial'],
        coverImage: '/blog/nextjs-13.jpg',
        readingTime: '5 min read',
    },
    {
        id: 2,
        title: 'Mastering TypeScript',
        slug: 'mastering-typescript',
        excerpt:
            'A comprehensive guide to TypeScript features and best practices for building type-safe applications.',
        content: 'Full blog post content here...',
        date: '2024-03-10',
        author: {
            name: 'Your Name',
            avatar: '/avatar.jpg',
        },
        categories: ['TypeScript', 'Programming'],
        tags: ['typescript', 'javascript', 'programming', 'tutorial'],
        coverImage: '/blog/typescript.jpg',
        readingTime: '8 min read',
    },
    // Add more blog posts as needed
]
