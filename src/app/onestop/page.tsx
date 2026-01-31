'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function OneStopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'CREATIVE' | 'TECHNICAL'>('CREATIVE');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  // Auto-hide success message after 8 seconds
  useEffect(() => {
    if (subscriptionStatus.type === 'success') {
      const timer = setTimeout(() => {
        setSubscriptionStatus({ type: null, message: '' });
      }, 8000); // 8 seconds
      
      return () => clearTimeout(timer); // Cleanup timer if component unmounts or status changes
    }
  }, [subscriptionStatus.type]);
  
  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle subscription form submission
  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setSubscriptionStatus({ type: null, message: '' });
    
    // Validate email
    if (!email.trim()) {
      setSubscriptionStatus({
        type: 'error',
        message: 'Please enter your email address.'
      });
      return;
    }
    
    if (!validateEmail(email)) {
      setSubscriptionStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }
    
    setIsSubscribing(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubscriptionStatus({
          type: 'success',
          message: 'Welcome aboard! Check your email for a special welcome message.'
        });
        setEmail(''); // Clear the form
      } else {
        setSubscriptionStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubscriptionStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubscribing(false);
    }
  };
  
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      excerpt: "Learn the best practices for creating maintainable and scalable React applications with modern patterns.",
      date: "Jan 15, 2025",
      readTime: "8 min read",
      category: "CREATIVE",
      tag: "React",
      link: "https://drive.google.com/file/d/1peBiMutL9-jIxrArf29UffP2rgtO9Yxe/view?usp=drive_link"
    },
    {
      id: 2,
      title: "TypeScript Advanced Patterns",
      excerpt: "Deep dive into advanced TypeScript patterns that will make your code more robust and type-safe.",
      date: "Jan 12, 2025",
      readTime: "12 min read",
      category: "TECHNICAL",
      tag: "TypeScript"
    },
    {
      id: 3,
      title: "Next.js 15 Performance Optimization",
      excerpt: "Discover the latest performance optimization techniques in Next.js 15 for lightning-fast web applications.",
      date: "Jan 10, 2025",
      readTime: "10 min read",
      category: "TECHNICAL", 
      tag: "Next.js"
    },
    {
      id: 4,
      title: "Modern UI/UX Design Principles",
      excerpt: "Explore the latest trends in user interface design and user experience optimization.",
      date: "Jan 8, 2025",
      readTime: "6 min read",
      category: "CREATIVE",
      tag: "Design",
      link: "https://drive.google.com/file/d/1nERYnDp5qZEfWz70qrQrv1iv0_v6mF9X/view?usp=drive_link"
    },
    {
      id: 5,
      title: "JavaScript Performance Tricks",
      excerpt: "Boost your JavaScript application performance with these proven optimization techniques.",
      date: "Jan 5, 2025",
      readTime: "9 min read",
      category: "TECHNICAL",
      tag: "JavaScript"
    },
    {
      id: 6,
      title: "Creative Animation Techniques",
      excerpt: "Master the art of web animations using Framer Motion and CSS transitions.",
      date: "Jan 3, 2025",
      readTime: "11 min read",
      category: "CREATIVE",
      tag: "Animation",
      link: "https://drive.google.com/file/d/117JuuON8YFbliASf5gElyu9N0WJNNQVv/view?usp=sharing"
    }
  ];

  // Filter posts based on search term and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black relative">
      {/* Main Grid Background Pattern - Inspired by uploaded image */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.3) 0.5px, transparent 0.5px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.3) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>
      
      {/* Secondary Fine Grid Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-8"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.15) 0.25px, transparent 0.25px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0.25px, transparent 0.25px)
            `,
            backgroundSize: '10px 10px'
          }}
        />
      </div>

      {/* Header Navigation */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-500/20 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ON</span>
              </div>
              <span className="text-2xl font-black text-white">ONESTOP</span>
            </motion.div>
          </Link>
          
          <div className="flex items-center gap-6">
            <motion.button 
              onClick={() => setActiveCategory('CREATIVE')}
              className={`font-medium transition-colors duration-300 hidden md:block ${
                activeCategory === 'CREATIVE' 
                  ? 'text-red-400' 
                  : 'text-red-400/60 hover:text-red-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              suppressHydrationWarning
            >
              CREATIVE
            </motion.button>
            <motion.button 
              onClick={() => setActiveCategory('TECHNICAL')}
              className={`font-medium transition-colors duration-300 hidden md:block ${
                activeCategory === 'TECHNICAL' 
                  ? 'text-blue-400' 
                  : 'text-blue-400/60 hover:text-blue-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              suppressHydrationWarning
            >
              TECHNICAL
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/"
                onClick={() => {
                  // Mark that user is navigating internally to skip intro
                  sessionStorage.setItem('internalNavigation', 'true');
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">View Portfolio</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section - With Personal Photo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-8">
              {/* Personal Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative mb-4"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-red-400/30 bg-gradient-to-br from-red-500/20 to-purple-600/20 backdrop-blur-sm">
                  <img
                    src="/images/mine.jpg"
                    alt="Harsha Parisha"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.h1
                className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                ONESTOP
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-2xl"
              >
                <p className="text-lg text-gray-400 leading-relaxed font-mono">
                  Thoughts that trigger builds, builds that teach lessons.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto mb-16 -mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-6 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50 transition-all duration-300 backdrop-blur-sm text-lg"
                suppressHydrationWarning
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="flex justify-center gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <motion.button 
              onClick={() => setActiveCategory('CREATIVE')}
              className={`font-bold text-lg transition-colors duration-300 pb-2 border-b-2 ${
                activeCategory === 'CREATIVE' 
                  ? 'text-red-400 border-red-400' 
                  : 'text-gray-500 border-transparent hover:text-red-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              suppressHydrationWarning
            >
              CREATIVE
            </motion.button>
            <motion.button 
              onClick={() => setActiveCategory('TECHNICAL')}
              className={`font-bold text-lg transition-colors duration-300 pb-2 border-b-2 ${
                activeCategory === 'TECHNICAL' 
                  ? 'text-blue-400 border-blue-400' 
                  : 'text-gray-500 border-transparent hover:text-blue-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              suppressHydrationWarning
            >
              TECHNICAL
            </motion.button>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            id="blog-posts"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => {
                    if (post.link) {
                      window.open(post.link, '_blank');
                    }
                  }}
                >
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-red-500/20 hover:border-red-400/40 transition-all duration-300 h-full">
                    {/* Post Image with Overlay */}
                    <div className="aspect-video bg-gradient-to-br from-red-500/20 to-black/60 relative overflow-hidden">
                      {/* You can add overlay images here */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      
                      {/* Link Indicator for Creative Posts */}
                      {post.link && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      )}
                      
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
                          post.category === 'CREATIVE' ? 'bg-red-500' : 'bg-blue-500'
                        }`}>
                          {post.tag}
                        </span>
                      </div>
                    </div>
                    
                    {/* Post Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-red-400 font-medium text-sm group-hover:text-red-300 transition-colors duration-300">
                        Read More
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="text-gray-400 text-lg mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33l-.88.88a3 3 0 104.24 4.24l.88-.88A7.962 7.962 0 0112 15z" />
                  </svg>
                  No posts found matching your search criteria.
                </div>
                <p className="text-gray-500 text-sm">
                  Try adjusting your search terms or switch to the other category.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Footer Section - Inspired by uploaded image */}
          <motion.div
            className="mt-32 pb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
              {/* Left Side - Logo and Description */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                {/* Logo Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-black text-lg">ON</span>
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tight">ONESTOP</h3>
                  </div>
                  
                  <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    Stay updated with the latest development stories, technical insights, and project builds.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <motion.a
                    href="https://github.com/HarshaParisha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/parisha-harshavardhan-a2141b25b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/harsha._.l4?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </motion.a>
                </div>

                {/* Tech Stack Button */}
                <div className="mt-6">
                  <button
                    className="relative group px-6 py-3 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-700/60 hover:border-red-500/40 transition-all duration-300 overflow-hidden"
                    onClick={() => window.open('https://docs.google.com/document/d/1M2ZgtEbgLxGudH6DAlxOjocvtnOgNfPB/edit?usp=sharing', '_blank', 'noopener,noreferrer')}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-red-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative font-sans font-bold text-sm tracking-wider text-white">
                      TECH STACK
                    </span>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
                  </button>
                </div>

              </motion.div>

              {/* Right Side - Premium Subscription */}
              <motion.div
                id="subscribe-section"
                className="relative overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                {/* Premium Card Background */}
                <div className="relative bg-gradient-to-br from-red-900/30 via-red-800/20 to-black/60 backdrop-blur-xl rounded-3xl border border-red-500/30 p-8 shadow-2xl shadow-red-900/20">
                  {/* Grid Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  </div>

                  {/* Premium Header */}
                  <div className="relative z-10 space-y-6">
                    <div className="text-center">
                      <motion.h3
                        className="text-2xl font-black text-white mb-3 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.2 }}
                      >
                        Never Miss an Update
                      </motion.h3>
                      
                      <motion.p
                        className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.3 }}
                      >
                        Get exclusive access to development insights and premium content.
                      </motion.p>
                    </div>

                    {/* Premium Subscription Form */}
                    <motion.div
                      className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 2.4 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white text-lg font-bold">Join OneStop</h4>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Be part of an exclusive community of developers and creators.
                      </p>
                      
                      {/* Status Message */}
                      {subscriptionStatus.type && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mb-4 p-3 rounded-lg text-sm ${
                            subscriptionStatus.type === 'success'
                              ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                              : 'bg-red-500/20 border border-red-500/30 text-red-400'
                          }`}
                        >
                          {subscriptionStatus.message}
                        </motion.div>
                      )}
                      
                      <form onSubmit={handleSubscription} className="space-y-4">
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubscribing}
                            className={`w-full px-5 py-3 bg-gray-900/80 border border-gray-600/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-400/60 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 text-sm ${
                              isSubscribing ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            suppressHydrationWarning
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                          </div>
                        </div>
                        
                        <motion.button
                          type="submit"
                          disabled={isSubscribing || !email.trim()}
                          className={`w-full px-6 py-3 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/40 text-sm relative overflow-hidden group ${
                            isSubscribing || !email.trim() ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          whileHover={!isSubscribing && email.trim() ? { scale: 1.02 } : {}}
                          whileTap={!isSubscribing && email.trim() ? { scale: 0.98 } : {}}
                          suppressHydrationWarning
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <span className="relative flex items-center justify-center gap-2">
                            {isSubscribing ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Subscribing...
                              </>
                            ) : (
                              <>
                                Subscribe Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </>
                            )}
                          </span>
                        </motion.button>
                      </form>

                      {/* Trust Indicators */}
                      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-700/30">
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span>Secure</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>No Spam</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-red-500/5 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-red-600/10 rounded-full blur-lg"></div>
                </div>
              </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
              className="mt-20 pt-8 border-t border-gray-800/30 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            >
              <p className="text-gray-500 text-sm mb-8">
                © 2025 OneStop by Harsha V. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Premium Floating Subscription Button */}
      <motion.button
        onClick={() => document.getElementById('subscribe-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700 text-white rounded-2xl shadow-2xl shadow-red-600/30 hover:shadow-red-600/40 flex items-center justify-center transition-all duration-300 z-50 border border-red-400/20 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        suppressHydrationWarning
      >
        {/* Premium Newsletter Icon */}
        <svg className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-2xl bg-red-500/20 animate-ping"></div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Subscribe to Updates
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black/90"></div>
        </div>
      </motion.button>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl" />
      <div className="absolute top-2/3 right-1/3 w-48 h-48 bg-red-700/5 rounded-full blur-3xl" />
    </div>
  );
}
