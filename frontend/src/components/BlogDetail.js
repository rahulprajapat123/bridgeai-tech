import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// BlogDetail Component
function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/blog/${slug}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 px-4 text-white text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-24 pb-20 px-4 text-white text-center">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-cyan-400 mt-4 inline-block">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="text-cyan-400 mb-8 inline-block hover:text-cyan-300">
          ← Back to blog
        </Link>

        <article className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            {post.category && (
              <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded text-sm">
                {post.category}
              </span>
            )}
            <span className="text-slate-400 text-sm">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          {post.author && (
            <div className="text-slate-400 mb-8">By {post.author}</div>
          )}

          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-slate-700 px-3 py-1 rounded text-sm text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

export default BlogDetail;