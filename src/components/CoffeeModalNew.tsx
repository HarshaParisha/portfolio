'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart, FiCoffee, FiArrowLeft } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

interface CoffeeSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CoffeeSupportModal = ({ isOpen, onClose }: CoffeeSupportModalProps) => {
  const [currentView, setCurrentView] = useState<'welcome' | 'qr'>('welcome');

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBuyCoffeeClick = () => {
    window.open('https://coff.ee/harsha._.14', '_blank', 'noopener,noreferrer');
  };

  const showQRCode = () => {
    setCurrentView('qr');
  };

  const backToWelcome = () => {
    setCurrentView('welcome');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Modal Container with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glassmorphism Card */}
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 group"
                aria-label="Close modal"
              >
                <FiX className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
              </button>

              {currentView === 'welcome' ? (
                <>
                  {/* Header Section */}
                  <div className="relative px-8 pt-12 pb-6">
                    {/* Subtle Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/20 dark:from-amber-900/10 dark:to-orange-900/5" />
                    
                    <div className="relative text-center">
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-6 shadow-lg shadow-amber-500/25">
                        <FiCoffee className="w-7 h-7 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                        Buy Me a Coffee
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Support My Work
                      </p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="px-8 pb-8">
                    {/* Quote Card */}
                    <div className="relative mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/30 border border-gray-200/50 dark:border-gray-600/20 backdrop-blur-sm">
                      <div className="absolute top-4 left-4">
                        <HiSparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                      </div>
                      <blockquote className="text-center pt-2">
                        <p className="text-gray-800 dark:text-gray-200 font-medium text-lg leading-relaxed italic">
                          "Code runs on caffeine, dreams run on determination."
                        </p>
                      </blockquote>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8 text-center">
                      Building innovative solutions takes dedication, late nights, and lots of coffee. 
                      Your support helps fuel creativity and keeps the development momentum going strong.
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                      {/* Primary CTA */}
                      <motion.button
                        onClick={handleBuyCoffeeClick}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 
                                   text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl 
                                   transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <FiCoffee className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
                        <span className="relative z-10">Buy Me a Coffee</span>
                      </motion.button>

                      {/* Secondary CTA */}
                      <motion.button
                        onClick={showQRCode}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/60 
                                   text-gray-700 dark:text-gray-300 font-medium py-3.5 px-6 rounded-xl 
                                   transition-all duration-200 flex items-center justify-center gap-3 group backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/30"
                      >
                        <FaQrcode className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Show QR Code
                      </motion.button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/30">
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2">
                        <FiHeart className="w-4 h-4 text-red-400" />
                        Every contribution makes a difference
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* QR Code View */}
                  <div className="px-8 py-12">
                    {/* Back Button */}
                    <button
                      onClick={backToWelcome}
                      className="absolute top-6 left-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 group"
                      aria-label="Go back"
                    >
                      <FiArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
                    </button>

                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
                        <FaQrcode className="w-7 h-7 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                        Scan QR Code
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Open your camera app to scan
                      </p>
                    </div>

                    {/* QR Code Container */}
                    <div className="flex justify-center mb-8">
                      <div className="p-6 bg-white rounded-3xl shadow-xl border border-gray-200/50">
                        <img 
                          src="/images/coffqr.png" 
                          alt="QR Code for Coffee Support" 
                          className="w-52 h-52 object-contain rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <motion.button
                        onClick={handleBuyCoffeeClick}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 
                                   text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl 
                                   transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <FiCoffee className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
                        <span className="relative z-10">Open Link Instead</span>
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-3xl blur-xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoffeeSupportModal;
