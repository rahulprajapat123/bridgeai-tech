import { Link } from 'react-router-dom';

// Footer Component
function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-lg font-bold">BridgeAI Tech</span>
            </div>
            <p className="text-slate-400 text-sm">
              Enterprise AI solutions that integrate seamlessly with your infrastructure.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <div className="space-y-2 text-sm">
              <Link to="/what-we-do" className="block text-slate-400 hover:text-cyan-400">
                What We Do
              </Link>
              <Link to="/use-cases" className="block text-slate-400 hover:text-cyan-400">
                Use Cases
              </Link>
              <Link to="/technology" className="block text-slate-400 hover:text-cyan-400">
                Technology
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm">
              <Link to="/case-studies" className="block text-slate-400 hover:text-cyan-400">
                Case Studies
              </Link>
              <Link to="/blog" className="block text-slate-400 hover:text-cyan-400">
                Blog
              </Link>
              <Link to="/contact" className="block text-slate-400 hover:text-cyan-400">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <a href="mailto:hello@bridgeaitech.com" className="block hover:text-cyan-400">
                hello@bridgeaitech.com
              </a>
              <p>Singapore</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© 2025 BridgeAI Tech Pte Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;