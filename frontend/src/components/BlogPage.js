import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// BlogPage Component
function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/blog');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 px-4 text-white text-center">
        <div className="animate-pulse">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Expert perspectives on AI strategy, implementation, and industry trends
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/blog/${post.slug}`}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl group"
            >
              <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                <div className="text-6xl">📝</div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  {post.category && (
                    <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm mb-4">{post.excerpt}</p>
                {post.author && (
                  <div className="text-sm text-slate-500">By {post.author}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;