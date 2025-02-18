import React from 'react';
import { getBlogPosts } from '../../lib/blog-posts';

const BlogPage = async () => {
    const posts = await getBlogPosts();

    return (
        <div>
            <h1>Blog</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <a href={`/blog/${post.id}`}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPage;