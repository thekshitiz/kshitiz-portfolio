export interface Project {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    link?: string
    github?: string
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description:
            'A modern e-commerce platform with real-time inventory management and AI-powered recommendations.',
        image: '/projects/ecommerce.jpg',
        tags: ['Next.js', 'Node.js', 'MongoDB', 'TailwindCSS'],
        link: 'https://ecommerce-demo.com',
        github: 'https://github.com/yourusername/ecommerce',
    },
    {
        id: 2,
        title: 'Task Management App',
        description:
            'A mobile app for task management with real-time collaboration features.',
        image: '/projects/taskapp.jpg',
        tags: ['React Native', 'Firebase', 'Redux'],
        link: 'https://taskapp-demo.com',
        github: 'https://github.com/yourusername/taskapp',
    },
    {
        id: 3,
        title: 'Portfolio Website',
        description:
            'My personal portfolio website built with Next.js and TailwindCSS',
        image: '/projects/portfolio.jpg',
        tags: ['Next.js', 'React', 'TailwindCSS', 'TypeScript'],
        link: 'https://your-portfolio.com',
        github: 'https://github.com/yourusername/portfolio',
    },
    // Add more projects...
]
