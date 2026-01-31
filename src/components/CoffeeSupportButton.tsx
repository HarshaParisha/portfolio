'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCoffee } from 'react-icons/fi';
import CoffeeSupportModal from './CoffeeModal';

const CoffeeSupportButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);

  const handleCoffeeClick = () => {
    console.log('Coffee button clicked!'); // Debug log
    setShowCoffeeModal(true);
  };

  console.log('CoffeeSupportButton rendered'); // Debug log

  return (
    <>
      {/* Coffee Support Modal */}
      <CoffeeSupportModal 
        isOpen={showCoffeeModal}
        onClose={() => setShowCoffeeModal(false)}
      />

      {/* Position adjusted for mobile - above mobile nav bar */}
      <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[100]">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-slate-700 text-white text-sm rounded-lg whitespace-nowrap shadow-lg"
            >
              Support my work with coffee
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-slate-700"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coffee Button */}
        <motion.button
          onClick={handleCoffeeClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 
                     text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
                     flex items-center justify-center group relative overflow-hidden border-2 border-white/10"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 3 
          }}
        >
          {/* Coffee Icon with Animation */}
          <motion.div
            animate={{ 
              rotate: [0, -8, 8, -8, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <FiCoffee className="text-2xl" />
          </motion.div>

          {/* Steam Animation */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/70 rounded-full"
                style={{ left: `${-3 + i * 3}px` }}
                animate={{
                  y: [-6, -18, -30],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 group-hover:from-amber-300/30 group-hover:to-orange-300/30 transition-all duration-300" />
        </motion.button>
      </div>
    </>
  );
};

export default CoffeeSupportButton;
