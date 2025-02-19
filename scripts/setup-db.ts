import { db } from '@/lib/db'

async function main() {
    try {
        // Create admin user
        const admin = await db.user.upsert({
            where: { email: process.env.ADMIN_EMAIL },
            update: {},
            create: {
                email: process.env.ADMIN_EMAIL!,
                name: 'Admin',
                role: 'ADMIN',
            },
        })

        console.log('✅ Admin user created:', admin.id)

        // Create sample blog post
        const blog = await db.blog.create({
            data: {
                title: 'Welcome to My Portfolio',
                slug: 'welcome-to-my-portfolio',
                excerpt: 'This is my first blog post.',
                content: 'Welcome to my portfolio website...',
                status: 'published',
                publishedAt: new Date(),
                authorId: admin.id,
            },
        })

        console.log('✅ Sample blog created:', blog.id)

        // Create sample project
        const project = await db.project.create({
            data: {
                title: 'Portfolio Website',
                slug: 'portfolio-website',
                description: 'My personal portfolio website built with Next.js',
                tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
                featured: true,
                status: 'published',
            },
        })

        console.log('✅ Sample project created:', project.id)
    } catch (error) {
        console.error('❌ Database setup failed:', error)
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}

main()
