import { db } from '@/lib/db'

export default async function PostsPage() {
    const posts = await db.post.getAll()

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                </div>
            ))}
        </div>
    )
}
