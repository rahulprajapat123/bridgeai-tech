// src/App.js - BridgeAI Tech Frontend
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  UseCasesPage,
  ApproachPage,
  TechnologyPage,
  SecurityPage,
  ContactPage,
  CaseStudiesPage,
  CaseStudyDetail,
  BlogPage,
  BlogDetail,
  LoginPage,
  AdminDashboard,
  Chatbot,
  Footer
} from './components';

// Configure axios
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_URL;

// Set auth token if exists
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/approach" element={<ApproachPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'What We Do', path: '/what-we-do' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: 'Approach', path: '/approach' },
    { name: 'Technology', path: '/technology' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-bold text-white">BridgeAI Tech</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white">
              Login
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-white"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white text-center"
            >
              Get in Touch
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// HomePage Component
function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-6 border border-cyan-500/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-sm text-cyan-400 font-medium">Enterprise AI Solutions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                AI that works!
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              We help organizations deploy <span className="text-cyan-400 font-semibold">AI agents</span> and{' '}
              <span className="text-cyan-400 font-semibold">RAG systems</span> that integrate with your existing 
              infrastructure - Azure, GCP, or on-premises - with security and governance built in.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Contact Us</span>
                <span>→</span>
              </button>
              <button
                onClick={() => navigate('/case-studies')}
                className="px-8 py-4 bg-slate-800 rounded-lg text-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700"
              >
                View Case Studies
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { label: 'Enterprise security', icon: '🔒' },
                { label: 'Cloud & on-premises', icon: '☁️' },
                { label: 'ROI-focused implementation', icon: '📈' }
              ].map((badge, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className="text-sm text-slate-400">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What BridgeAI does</h2>
            <p className="text-xl text-slate-400">Three ways we help you move from ideas to impact.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Consulting / Advisory',
                description: 'Leverage AI/GenAI to transform Marketing, Sales, and Insights/Analytics for tangible business value.',
                icon: '💡'
              },
              {
                title: 'Design, Build & Deploy',
                description: 'From idea to secure, production-ready solutions that work inside your stack and workflows.',
                icon: '🚀'
              },
              {
                title: 'Training (Role-specific)',
                description: 'Practical trainings on tools, workflows, and how to QA/test outputs for your teams.',
                icon: '🎓'
              }
            ].map((service, i) => (
              <div
                key={i}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/what-we-do')}
              className="px-6 py-3 text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Learn more about our services →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-12 border border-cyan-500/20 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Contact us to discuss your AI implementation needs and explore how we can support your organization.
          </p>
          <a
            href="mailto:hello@bridgeaitech.com"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
          >
            <span>hello@bridgeaitech.com</span>
          </a>
        </div>
      </section>
    </div>
  );
}

// WhatWeDoPage Component
function WhatWeDoPage() {
  const services = [
    {
      title: 'Consulting / Advisory',
      description: 'Strategic guidance on leveraging AI/GenAI to transform your business operations.',
      details: [
        'Use case identification and prioritization',
        'ROI modeling and business case development',
        'Technology stack recommendations',
        'Change management and adoption strategies'
      ],
      icon: '💡'
    },
    {
      title: 'Design, Build & Deploy',
      description: 'End-to-end implementation of secure, production-ready AI solutions.',
      details: [
        'Custom AI agent development',
        'RAG system implementation',
        'System integration and API development',
        'Security and compliance configuration'
      ],
      icon: '🚀'
    },
    {
      title: 'Training (Role-specific)',
      description: 'Practical, hands-on training tailored to your team\'s specific roles and workflows.',
      details: [
        'Tool-specific training programs',
        'Prompt engineering best practices',
        'Quality assurance and testing methods',
        'Workflow optimization techniques'
      ],
      icon: '🎓'
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">What We Do</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Comprehensive AI solutions from strategy to implementation
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start space-x-6">
                <div className="text-6xl">{service.icon}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-xl text-slate-300 mb-6">{service.description}</p>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {service.details.map((detail, j) => (
                      <li key={j} className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span className="text-slate-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;