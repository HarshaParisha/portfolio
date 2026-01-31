'use client';

import { motion } from 'framer-motion';

const scrollingPhrases = [
  'MORE THAN A DEV',
  'DESIGN-DRIVEN THINKING', 
  'ANALYTICAL MINDSET',
  'PASSIONATE CREATOR',
  'PROBLEM SOLVER',
  'TECH INNOVATOR',
  'FULL-STACK ENGINEER',
  'AI ENTHUSIAST',
  'ARCHITECT OF COGNITIVE SYSTEMS',
  'DESIGN INTELLIGENCE IN MOTION',
  'SYNTAX OF THE HUMAN CONDITION'
];

export default function ScrollingBannerSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900/20"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-move 20s linear infinite'
          }}
        ></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

      {/* Vertically Centered Container for All Lines */}
      <div className="relative z-10 flex flex-col justify-center items-center space-y-4 sm:space-y-6 md:space-y-12 lg:space-y-16">
        
        {/* Scrolling Text Banner - Line 1 */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex shrink-0">
                {scrollingPhrases.slice(0, 4).map((phrase, index) => (
                  <div key={`${i}-${index}`} className="flex items-center mx-6 sm:mx-8 md:mx-12">
                    <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-purple-300/40 tracking-wider uppercase font-sans leading-none">
                      {phrase}
                    </span>
                    <span className="text-purple-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl mx-4 sm:mx-6 md:mx-8">★</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scrolling Text Banner - Line 2 */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [-1920, 0] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex shrink-0">
                {scrollingPhrases.slice(4, 8).map((phrase, index) => (
                  <div key={`${i}-${index}`} className="flex items-center mx-12">
                    <span className="text-purple-400 text-2xl md:text-3xl lg:text-4xl mx-8">★</span>
                    <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-purple-300/40 tracking-wider uppercase font-sans leading-none">
                      {phrase}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scrolling Text Banner - Line 3 */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex shrink-0">
                {scrollingPhrases.slice(8).map((phrase, index) => (
                  <div key={`${i}-${index}`} className="flex items-center mx-12">
                    <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-purple-300/40 tracking-wider uppercase font-sans leading-none">
                      {phrase}
                    </span>
                    <span className="text-purple-400 text-2xl md:text-3xl lg:text-4xl mx-8">★</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Custom CSS for grid animation */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </section>
  );
}
