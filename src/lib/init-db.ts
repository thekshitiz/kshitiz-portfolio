import { db } from './db'

async function main() {
    try {
        // Create initial admin user
        const adminUser = await db.user.upsert({
            where: { email: process.env.ADMIN_EMAIL },
            update: {},
            create: {
                email: process.env.ADMIN_EMAIL!,
                name: 'Admin',
                role: 'ADMIN',
            },
        })

        console.log('Database initialized with admin user:', adminUser.id)
    } catch (error) {
        console.error('Error initializing database:', error)
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}

main()
