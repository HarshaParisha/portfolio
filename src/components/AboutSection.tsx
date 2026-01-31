'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaLightbulb, FaRocket, FaHeart } from 'react-icons/fa';

const aboutSections = [
  {
    id: 'journey',
    title: 'My Journey',
    icon: FaCode,
    image: '/images/about/my-journey.jpg',
    content: {
      heading: 'DESIGN, DEVELOP, DEPLOY.',
      description: `My journey into tech began with a love for design and creativity — especially tools like Photoshop, which sparked my interest in crafting visually appealing and interactive interfaces. Over time, this merged with my growing skills in programming, leading me into the world of full-stack development and real-time applications.`,
      highlights: ['design', 'creativity', 'programming', 'full-stack development']
    }
  },
  {
    id: 'innovation',
    title: 'Innovation',
    icon: FaLightbulb,
    image: '/images/about/innovation.jpg', // Fixed: removed double extension
    content: {
      heading: 'THINK, CREATE, INNOVATE.',
      description: `I thrive on solving complex problems with innovative solutions. Whether it's implementing cutting-edge technologies or finding creative approaches to user experience challenges, I'm always pushing the boundaries of what's possible in web development.`,
      highlights: ['problem solving', 'cutting-edge technologies', 'user experience', 'web development']
    }
  },
  {
    id: 'beyond-tech',
    title: 'Beyond Tech',
    icon: FaRocket,
    image: '/images/about/beyond-tech.jpg',
    content: {
      heading: 'EXPLORE, LEARN, GROW.',
      description: `Beyond coding, I'm passionate about continuous learning and exploring new technologies. I enjoy contributing to open-source projects, mentoring fellow developers, and staying updated with the latest trends in the tech industry.`,
      highlights: ['continuous learning', 'open-source', 'mentoring', 'tech trends']
    }
  },
  {
    id: 'core-values',
    title: 'Core Values',
    icon: FaHeart,
    image: '/images/about/core-values.jpg',
    content: {
      heading: 'INTEGRITY, QUALITY, IMPACT.',
      description: `I believe in writing clean, maintainable code and delivering solutions that make a real impact. Collaboration, transparency, and attention to detail are at the core of my development philosophy.`,
      highlights: ['clean code', 'maintainable', 'real impact', 'collaboration']
    }
  }
];

export default function AboutSection() {
  const [activeSection, setActiveSection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Handle image loading errors
  const handleImageError = (imagePath: string) => {
    setImageErrors(prev => new Set(prev).add(imagePath));
  };

  // Auto-cycle through sections every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % aboutSections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSection = aboutSections[activeSection];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-green-400 font-mono text-sm sm:text-base md:text-lg">01.</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Section Navigation Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
              {aboutSections.map((section, index) => {
                const Icon = section.icon;
                const isActive = index === activeSection;
                
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(index);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    suppressHydrationWarning
                  >
                    <Icon size={14} />
                    {section.title}
                    {isActive && (
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full animate-pulse"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Dynamic Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <currentSection.icon className="text-purple-400" size={24} />
                  <h3 className="text-2xl font-bold text-white">
                    {currentSection.title}
                  </h3>
                </div>

                <motion.h4 
                  className="text-lg font-bold text-purple-300 tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentSection.content.heading}
                </motion.h4>

                <motion.p 
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentSection.content.description.split(' ').map((word, index) => {
                    const isHighlight = currentSection.content.highlights.some(highlight => 
                      word.toLowerCase().includes(highlight.toLowerCase().replace(' ', ''))
                    );
                    
                    return (
                      <span 
                        key={index}
                        className={isHighlight ? 'text-green-400 font-medium' : ''}
                      >
                        {word}{' '}
                      </span>
                    );
                  })}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/collab-chat'}
              suppressHydrationWarning
            >
              Let's Work Together
            </motion.button>
          </motion.div>

          {/* Right Image/Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden min-h-[500px] border border-gray-700">
              {/* Photo Display */}
              <div className="relative w-full h-full min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    {!imageErrors.has(currentSection.image) ? (
                      <img
                        src={currentSection.image}
                        alt={`${currentSection.title} - Personal photo`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(currentSection.image)}
                        onLoad={() => console.log(`Loaded: ${currentSection.image}`)}
                      />
                    ) : (
                      // Fallback when image doesn't load
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center">
                        <div className="text-center text-white">
                          <currentSection.icon size={64} className="mx-auto mb-4 text-purple-200" />
                          <h3 className="text-2xl font-bold mb-2">{currentSection.title}</h3>
                          <p className="text-purple-200 text-sm">{currentSection.content.heading}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          <currentSection.icon className="text-purple-400" size={20} />
                          <h3 className="text-xl font-bold">{currentSection.title}</h3>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {currentSection.content.heading}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Progress Indicator */}
              <motion.div
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between text-white/80 text-xs mb-2 min-w-[120px]">
                  <span className="font-mono">0{activeSection + 1}/04</span>
                  <span>{isPaused ? 'Paused' : 'Playing'}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1">
                  <motion.div
                    className="bg-purple-400 h-1 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "100%" : "100%" }}
                    transition={{ 
                      duration: isPaused ? 0 : 5,
                      ease: "linear",
                      repeat: isPaused ? 0 : Infinity
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Navigation Dots */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {aboutSections.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setActiveSection(index);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 8000);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeSection 
                        ? 'bg-purple-400 scale-125' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
