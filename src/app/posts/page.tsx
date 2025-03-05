export default function PostsPage() {
    const posts = [
        {
            id: '1',
            title: 'Sample Post 1',
            excerpt: 'This is a sample post excerpt',
            createdAt: new Date().toISOString(),
        },
        // Add more static posts as needed
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {post.excerpt}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
