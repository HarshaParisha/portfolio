'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaFileDownload } from 'react-icons/fa';
import { useState, useEffect } from 'react';

// Typewriter Effect Component
const TypewriterEffect = () => {
  const titles = ['Software Developer', 'Frontend Developer'];
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        // Deleting characters
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      } else {
        // Typing characters
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          // Pause when complete
          setIsPaused(true);
        }
      }
    }, isDeleting ? 50 : isPaused ? 2000 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, titleIndex, isDeleting, isPaused, titles]);

  return (
    <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6 min-h-[3rem] sm:min-h-[4rem] md:min-h-[6rem] flex items-center justify-center">
      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
        {displayText}
        <span className="animate-pulse text-purple-400">|</span>
      </span>
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 pb-20 lg:pb-4 overflow-hidden">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm scale-110"
          style={{
            backgroundImage: "url('/images/hero-background.jpg')",
          }}
        />
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Gradient Overlay for Smooth Transition */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80" />
        
        {/* Enhanced Bottom Gradient for Seamless Section Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      </div>

      {/* Additional Smooth Transition Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-15"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-20">
        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Available for opportunities
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-30"
        >
          {/* Name */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Harsha Vardhan.
          </motion.h1>
          
          {/* Role with Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2>
              <TypewriterEffect />
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I'm a computer science student with a strong foundation in software development, 
            problem-solving, and project management. Currently focused on building scalable 
            applications and exploring new technologies.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-16 w-full px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 w-full sm:min-w-[200px] sm:w-auto justify-center text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              suppressHydrationWarning
            >
              View Forge →
            </motion.button>
            
            <motion.a
              href="https://drive.google.com/file/d/1vvZSWHnlD9kt0ODVoi0SnWtpF-4AYmRz/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 w-full sm:min-w-[200px] sm:w-auto justify-center text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              suppressHydrationWarning
            >
              <FaFileDownload />
              Resume
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/parisha-harshavardhan-a2141b25b/', label: 'LinkedIn' },
              { icon: FaGithub, href: 'https://github.com/HarshaParisha', label: 'GitHub' },
              { icon: FaInstagram, href: 'https://www.instagram.com/harsha._.l4?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
                suppressHydrationWarning
              >
                <Icon size={18} className="sm:w-5 sm:h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
