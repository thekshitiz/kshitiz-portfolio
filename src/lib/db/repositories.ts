// Implement repository pattern for database access
export class PostRepository {
    static async getAll(params: {
        page: number
        limit: number
        where: Prisma.PostWhereInput
    }) {
        const { page, limit, where } = params
        const skip = (page - 1) * limit
        
        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                skip,
                take: limit,
                where,
                include: { author: true }
            }),
            prisma.post.count({ where })
        ])
        
        return {
            data: posts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }
} 