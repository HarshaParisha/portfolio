'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCoffee } from 'react-icons/fi';
import CoffeeSupportModal from './CoffeeModal';

const FloatingCoffee = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);

  const handleCoffeeClick = () => {
    setShowCoffeeModal(true);
  };

  return (
    <>
      {/* Coffee Support Modal */}
      <CoffeeSupportModal 
        isOpen={showCoffeeModal}
        onClose={() => setShowCoffeeModal(false)}
      />

      {/* Position adjusted for mobile - above mobile nav bar */}
      <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-40">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/80 dark:bg-white/10 backdrop-blur-md text-white dark:text-gray-200 text-sm rounded-xl whitespace-nowrap shadow-2xl border border-white/20"
              style={{ fontFamily: 'Inter, -apple-system, system-ui, sans-serif' }}
            >
              Support my work
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80 dark:border-t-white/10"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Luxury Coffee Button */}
        <motion.button
          onClick={handleCoffeeClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-14 h-14 bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 hover:from-amber-500 hover:via-orange-500 hover:to-orange-600 
                     text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 
                     flex items-center justify-center group relative overflow-visible border border-white/20"
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            delay: 1.5 
          }}
        >
          {/* Coffee Icon */}
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.05, 1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <FiCoffee className="text-xl" />
          </motion.div>

          {/* Enhanced Steam Animation */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            {/* Main steam particles */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={`steam-${i}`}
                className="absolute w-2 h-2 bg-white rounded-full shadow-lg"
                style={{ 
                  left: `${-4 + i * 4}px`,
                  filter: 'blur(0.5px)'
                }}
                animate={{
                  y: [0, -20, -35],
                  opacity: [1, 0.7, 0],
                  scale: [0.8, 1.2, 0.3],
                  x: [0, Math.sin(i * 0.9) * 5, Math.sin(i * 1.3) * 8]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: [0.4, 0, 0.6, 1]
                }}
              />
            ))}
            
            {/* Secondary steam wisps */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={`wisp-${i}`}
                className="absolute w-1 h-1 bg-white/80 rounded-full"
                style={{ 
                  left: `${-2 + i * 2}px`,
                  filter: 'blur(0.3px)'
                }}
                animate={{
                  y: [2, -15, -28],
                  opacity: [0.8, 0.5, 0],
                  scale: [0.6, 1, 0.2],
                  x: [0, Math.sin(i * 1.7) * 3, Math.sin(i * 2.1) * 5]
                }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  delay: (i * 0.3) + 0.5,
                  ease: [0.4, 0, 0.6, 1]
                }}
              />
            ))}
          </div>

          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300" />
          
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-400/20 group-hover:ring-orange-300/40 transition-all duration-300" />
        </motion.button>
      </div>
    </>
  );
};

export default FloatingCoffee;
