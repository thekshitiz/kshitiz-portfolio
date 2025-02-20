// Centralize validation schemas
import { z } from 'zod'

export const UserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['ADMIN', 'AUTHOR', 'USER'])
})

export const BlogSchema = z.object({
    title: z.string().min(1).max(100),
    excerpt: z.string().min(1).max(300),
    content: z.string().min(1),
    status: z.enum(['draft', 'published'])
}) 