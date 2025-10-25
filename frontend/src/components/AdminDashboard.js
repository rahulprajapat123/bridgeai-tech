import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// AdminDashboard Component (Basic)
function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="pt-24 pb-20 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-400 mt-2">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-2">Blog Posts</h3>
            <p className="text-slate-400">Manage your blog content</p>
            <button className="mt-4 text-cyan-400 hover:text-cyan-300">
              Manage →
            </button>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-2">Case Studies</h3>
            <p className="text-slate-400">Manage case studies</p>
            <button className="mt-4 text-cyan-400 hover:text-cyan-300">
              Manage →
            </button>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-2">Contacts</h3>
            <p className="text-slate-400">View form submissions</p>
            <button className="mt-4 text-cyan-400 hover:text-cyan-300">
              View →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;