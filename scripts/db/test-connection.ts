import { db } from './db'

async function testConnection() {
    try {
        await db.connect()

        // Try to query the database
        const result = await db.client.$queryRaw`SELECT 1 as connected`
        console.log('✅ Database connection test:', result)

        // Test each model with a count query
        const counts = await Promise.all([
            db.client.user.count(),
            db.client.blog.count(),
            db.client.project.count(),
        ])

        console.log('📊 Current database stats:')
        console.log('Users:', counts[0])
        console.log('Blogs:', counts[1])
        console.log('Projects:', counts[2])

        return true
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        if (error instanceof Error) {
            console.error('Error message:', error.message)
            console.error('Error stack:', error.stack)
        }
        return false
    } finally {
        await db.disconnect()
    }
}

// Run if called directly
if (require.main === module) {
    testConnection()
        .then((success) => {
            if (!success) {
                process.exit(1)
            }
        })
        .catch((error) => {
            console.error('Unhandled error:', error)
            process.exit(1)
        })
}

export { testConnection }
