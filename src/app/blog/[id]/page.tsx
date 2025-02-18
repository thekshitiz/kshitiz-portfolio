import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getBlogPostById } from '../../../lib/blog-posts';

const BlogPostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const data = await getBlogPostById(id);
        setPost(data);
        setLoading(false);
      };
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </div>
  );
};

export default BlogPostPage;