'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCoffee } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';

interface CoffeeSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CoffeeSupportModal = ({ isOpen, onClose }: CoffeeSupportModalProps) => {
  const [showQR, setShowQR] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBuyCoffeeClick = () => {
    window.open('https://coff.ee/harsha._.14', '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Luxury Glass Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Frosted Glass Container */}
            <div className="relative bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-white/10 shadow-2xl overflow-hidden">
              
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-200 group backdrop-blur-sm"
                aria-label="Close"
              >
                <FiX className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
              </button>

              <div className="p-8 text-center">
                {!showQR ? (
                  <>
                    {/* Coffee Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-6 shadow-lg shadow-orange-500/25">
                      <FiCoffee className="w-8 h-8 text-white" />
                    </div>

                    {/* Bold Motivational Quote */}
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-tight" style={{ fontFamily: 'Inter, -apple-system, system-ui, sans-serif' }}>
                      Code. Create. Repeat.
                    </h1>

                    {/* Minimal Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8 font-medium" style={{ fontFamily: 'Inter, -apple-system, system-ui, sans-serif' }}>
                      Every cup fuels better design and smarter code. Thanks for the support.
                    </p>

                    {/* Primary CTA - Apple Pay Inspired */}
                    <motion.button
                      onClick={handleBuyCoffeeClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 hover:from-amber-500 hover:via-orange-500 hover:to-orange-600 
                                 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl 
                                 transition-all duration-300 mb-4 relative overflow-hidden group"
                      style={{ fontFamily: 'Inter, -apple-system, system-ui, sans-serif' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        <FiCoffee className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Buy Me a Coffee</span>
                      </div>
                    </motion.button>

                    {/* Secondary QR Button */}
                    <motion.button
                      onClick={() => setShowQR(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gray-100/60 hover:bg-gray-200/60 dark:bg-gray-800/40 dark:hover:bg-gray-700/50 
                                 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl 
                                 transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/30
                                 flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Inter, -apple-system, system-ui, sans-serif' }}
                    >
                      <FaQrcode className="w-4 h-4" />
                      Show QR
                    </motion.button>
                  </>
                ) : (
                  <>
                    {/* QR Code View */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
                        <FaQrcode className="w-8 h-8 text-white" />
                      </div>

                      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight" style={{ fontFamily: 'Inter, -apple-system, system-ui, sans-serif' }}>
                        Scan & Support
                      </h2>

                      {/* QR Code */}
                      <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white rounded-2xl shadow-xl">
                          <img 
                            src="/images/coffqr.png" 
                            alt="QR Code for Coffee Support" 
                            className="w-44 h-44 object-contain"
                          />
                        </div>
                      </div>

                      {/* Back Button */}
                      <motion.button
                        onClick={() => setShowQR(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gray-100/60 hover:bg-gray-200/60 dark:bg-gray-800/40 dark:hover:bg-gray-700/50 
                                   text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl 
                                   transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/30"
                        style={{ fontFamily: 'Inter, -apple-system, system-ui, sans-serif' }}
                      >
                        Back
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Outer Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl blur-2xl scale-105" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoffeeSupportModal;
