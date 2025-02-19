export interface Project {
    id: string
    title: string
    description: string
    image: string
    category: string
    technologies: string[]
    liveUrl?: string
    githubUrl?: string
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description:
            'A modern e-commerce platform with real-time inventory management and AI-powered recommendations.',
        image: '/projects/ecommerce.jpg',
        category: 'Web Development',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'TailwindCSS'],
        liveUrl: 'https://ecommerce-demo.com',
        githubUrl: 'https://github.com/yourusername/ecommerce',
    },
    {
        id: '2',
        title: 'Task Management App',
        description:
            'A mobile app for task management with real-time collaboration features.',
        image: '/projects/taskapp.jpg',
        category: 'Mobile Apps',
        technologies: ['React Native', 'Firebase', 'Redux'],
        liveUrl: 'https://taskapp-demo.com',
        githubUrl: 'https://github.com/yourusername/taskapp',
    },
    // Add more projects...
]
