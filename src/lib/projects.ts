export interface Project {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    link?: string
    github?: string
    details: {
        challenge: string
        solution: string
        impact: string
        technologies: string[]
    }
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'E-commerce Platform',
        description:
            'A full-stack e-commerce solution with React, Node.js, and MongoDB.',
        image: '/placeholder.svg?height=300&width=400',
        tags: ['React', 'Node.js', 'MongoDB', 'Express'],
        link: 'https://example.com/ecommerce',
        github: 'https://github.com/yourusername/ecommerce',
        details: {
            challenge:
                'Building a scalable e-commerce platform with real-time inventory management.',
            solution:
                'Implemented websockets for real-time updates and Redis for caching.',
            impact: 'Increased sales by 40% and reduced page load time by 60%.',
            technologies: [
                'React',
                'Node.js',
                'MongoDB',
                'Express',
                'Redis',
                'WebSocket',
            ],
        },
    },
    {
        id: 2,
        title: 'Example Project',
        description: 'This is an example project',
        image: '/placeholder.jpg',
        tags: ['React', 'TypeScript', 'Next.js'],
    },
    // ... other projects
]
