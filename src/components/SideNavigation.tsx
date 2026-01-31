'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaUser, FaCode, FaProjectDiagram, FaHome, FaFileAlt, FaGraduationCap, FaCrown, FaCertificate, FaPaintBrush, FaBars, FaTimes } from 'react-icons/fa';

const navigationItems = [
  { name: 'Home', href: '#home', icon: FaHome },
  { name: 'About', href: '#about', icon: FaUser },
  { name: 'Education', href: '#education', icon: FaGraduationCap },
  { name: 'Skills', href: '#skills', icon: FaCode },
  { name: 'Projects', href: '#projects', icon: FaProjectDiagram },
  { name: 'Leadership', href: '#leadership', icon: FaCrown },
  { name: 'Certifications', href: '#certifications', icon: FaCertificate },
  { name: 'Visual Stories', href: '#visual-stories', icon: FaPaintBrush },
  { name: 'Resume', href: 'https://drive.google.com/file/d/1vvZSWHnlD9kt0ODVoi0SnWtpF-4AYmRz/view?usp=sharing', icon: FaFileAlt, external: true }
];

// Mobile navigation items (condensed for bottom bar)
const mobileNavItems = [
  { name: 'Home', href: '#home', icon: FaHome },
  { name: 'About', href: '#about', icon: FaUser },
  { name: 'Skills', href: '#skills', icon: FaCode },
  { name: 'Projects', href: '#projects', icon: FaProjectDiagram },
];

export default function SideNavigation() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Force dark mode on mount
    document.documentElement.classList.add('dark');
    setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const scrollToSection = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank');
      return;
    }
    const element = document.querySelector(href === '#home' ? 'body' : href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Desktop Side Navigation - Hidden on mobile */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/90 backdrop-blur-md border border-gray-800/30 shadow-2xl"
        style={{
          borderRadius: '25px',
          width: '60px',
        }}
      >
        <div className="flex flex-col items-center py-6 px-2">
          {/* Logo/Brand */}
          <motion.div
            className="mb-6"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/logo.jpg"
                alt="Harsha P Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex flex-col space-y-3">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.external)}
                  className="relative w-10 h-10 rounded-lg transition-all duration-300 group text-gray-400 hover:text-white hover:bg-purple-500/20 border border-transparent hover:border-purple-500/30 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  title={item.name}
                  suppressHydrationWarning
                >
                  <Icon size={16} />

                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                    {item.name}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black/90"></div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300 mt-6 border border-transparent hover:border-purple-500/30 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: navigationItems.length * 0.1 }}
            title="Toggle Theme"
            suppressHydrationWarning
          >
            {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-gray-800/30 shadow-2xl px-2 pb-safe"
      >
        <div className="flex items-center justify-around py-2 max-w-md mx-auto">
          {mobileNavItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.external)}
                className="flex flex-col items-center justify-center px-3 py-2 text-gray-400 hover:text-white transition-colors duration-300 min-w-[60px]"
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                suppressHydrationWarning
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.name}</span>
              </motion.button>
            );
          })}
          
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-center justify-center px-3 py-2 text-gray-400 hover:text-white transition-colors duration-300 min-w-[60px]"
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            suppressHydrationWarning
          >
            <FaBars size={20} />
            <span className="text-xs mt-1">More</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Full Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[60] bg-black/95 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="flex flex-col items-center justify-center h-full px-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white text-3xl"
              >
                <FaTimes />
              </button>

              {/* Logo */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img
                  src="/images/logo.jpg"
                  alt="Harsha P Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* All Navigation Items */}
              <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href, item.external)}
                      className="flex items-center gap-4 w-full px-6 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-purple-500/20 border border-transparent hover:border-purple-500/30 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={24} />
                      <span className="text-lg font-medium">{item.name}</span>
                    </motion.button>
                  );
                })}

                {/* Dark Mode Toggle in Mobile Menu */}
                <motion.button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-4 w-full px-6 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-purple-500/20 border border-transparent hover:border-purple-500/30 transition-all duration-300 mt-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigationItems.length * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
                  <span className="text-lg font-medium">Toggle Theme</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
