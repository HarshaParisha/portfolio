'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Gallery data with actual photos in 3 rows of 4 images each
const galleryProjects = [
  // Row 1 - Digital Art & Design
  [
    { id: 1, title: 'Creative Vision 1', caption: 'Professional photography and design work', image: '/images/gallery/visual-story-01.jpg' },
    { id: 2, title: 'Creative Vision 2', caption: 'Artistic composition and visual storytelling', image: '/images/gallery/visual-story-02.jpg' },
    { id: 3, title: 'Creative Vision 3', caption: 'Modern design with creative elements', image: '/images/gallery/visual-story-03.jpg' },
    { id: 4, title: 'Creative Vision 4', caption: 'Professional visual content creation', image: '/images/gallery/visual-story-04.jpg' },
  ],
  // Row 2 - Brand & Identity
  [
    { id: 5, title: 'Creative Vision 5', caption: 'Brand identity and visual design', image: '/images/gallery/visual-story-05.jpg' },
    { id: 6, title: 'Creative Vision 6', caption: 'Contemporary visual aesthetics', image: '/images/gallery/visual-story-06.jpg' },
    { id: 7, title: 'Creative Vision 7', caption: 'Creative photography and editing', image: '/images/gallery/visual-story-07.jpg' },
    { id: 8, title: 'Creative Vision 8', caption: 'Professional visual storytelling', image: '/images/gallery/visual-story-08.jpg' },
  ],
  // Row 3 - Creative Concepts
  [
    { id: 9, title: 'Creative Vision 9', caption: 'Innovative design concepts and execution', image: '/images/gallery/visual-story-09.jpg' },
    { id: 10, title: 'Creative Vision 10', caption: 'Artistic expression through visual media', image: '/images/gallery/visual-story-10.jpg' },
    { id: 11, title: 'Creative Vision 11', caption: 'Creative composition and visual impact', image: '/images/gallery/visual-story-11.jpg' },
    { id: 12, title: 'Creative Vision 12', caption: 'Professional creative content development', image: '/images/gallery/visual-story-12.jpg' },
  ]
];

// Design poster component with click interactions
const DesignPoster = ({ project, isExpanded, onToggle }: { 
  project: any; 
  isExpanded: boolean; 
  onToggle: () => void; 
}) => {
  return (
    <motion.div
      className="group cursor-pointer"
      onClick={onToggle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: project.id * 0.1 }}
    >
      {/* Image Container */}
      <motion.div
        className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800"
        style={{
          aspectRatio: isExpanded ? '3/4' : '4/3', // Switch between landscape and portrait
        }}
        animate={{
          aspectRatio: isExpanded ? '3/4' : '4/3',
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Actual Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback gradient if image fails to load
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.nextElementSibling) {
              (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
            }
          }}
        />
        
        {/* Fallback Gradient (hidden by default) */}
        <div 
          className="absolute inset-0 hidden"
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/60 text-sm">Image Loading...</span>
          </div>
        </div>
        
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          {/* Top: Watermark */}
          <div className="flex justify-end">
            <span className="text-white/80 text-xs font-light tracking-widest drop-shadow-lg">
              HARSHA P
            </span>
          </div>
            
            {/* Center: Clean Design Element (no numbers) */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <motion.div 
                  className="w-3 h-3 mx-auto mb-3 bg-white/40 rounded-full"
                  whileHover={{ scale: 1.2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                />
                <div className="w-16 h-0.5 bg-white/30 mx-auto rounded-full" />
              </div>
            </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-300 -z-10" />
      </motion.div>

      {/* Caption (appears when clicked/expanded) */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? 'auto' : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pt-3 pb-2">
          <p className="text-gray-400 text-xs leading-relaxed">
            {project.caption}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CreativeStories() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="visual-stories" className="relative w-full py-20 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Main Grid Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Secondary Grid Overlay */}
        <div 
          className="absolute inset-0 w-full h-full opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />
      </div>

      {/* Subtle Gradient Overlays for Depth */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-pink-900/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-64 bg-gradient-to-r from-blue-900/5 via-transparent to-indigo-900/5 transform -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-left mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            style={{
              background: 'linear-gradient(135deg, #c084fc 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Crafting Visual Stories
          </h2>
          
          <p
            className="text-base md:text-lg leading-relaxed max-w-3xl"
            style={{ color: '#C7C7D7' }}
          >
            Designing is one of my favorite ways to express creativity. I often spend time 
            crafting creative designs with Photoshop and Canva, exploring new styles, and 
            sharpening my creative instincts.
          </p>
        </motion.div>
        
        {/* Gallery Grid - 3 rows × 4 columns */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {galleryProjects.map((row, rowIndex) => (
            <motion.div 
              key={`row-${rowIndex}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: rowIndex * 0.1 }}
            >
              {row.map((project) => (
                <DesignPoster
                  key={project.id}
                  project={project}
                  isExpanded={expandedId === project.id}
                  onToggle={() => handleToggle(project.id)}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Each design tells a unique story through careful attention to visual harmony, 
            creative expression, and innovative thinking.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['Photoshop', 'Canva', 'Visual Design', 'Creative Direction', 'Brand Identity'].map((tool) => (
              <motion.span 
                key={tool}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Stock Market Heatmap Section
export function StockieSection() {
  // 7 International stocks data
  const internationalStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '+2.34%', trend: 'up', size: 'large' },
    { symbol: 'MSFT', name: 'Microsoft', price: '+1.87%', trend: 'up', size: 'normal' },
    { symbol: 'GOOGL', name: 'Alphabet', price: '-0.45%', trend: 'down', size: 'normal' },
    { symbol: 'AMZN', name: 'Amazon', price: '+3.21%', trend: 'up', size: 'normal' },
    { symbol: 'TSLA', name: 'Tesla', price: '-2.15%', trend: 'down', size: 'large' },
    { symbol: 'META', name: 'Meta', price: '+1.65%', trend: 'up', size: 'normal' },
    { symbol: 'NVDA', name: 'NVIDIA', price: '+4.78%', trend: 'up', size: 'normal' },
  ];

  // 7 Indian stocks data
  const indianStocks = [
    { symbol: 'RELIANCE', name: 'Reliance', price: '-1.53%', trend: 'down', size: 'large' },
    { symbol: 'TCS', name: 'TCS', price: '-0.92%', trend: 'down', size: 'normal' },
    { symbol: 'INFY', name: 'Infosys', price: '-1.32%', trend: 'down', size: 'normal' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '+0.78%', trend: 'up', size: 'normal' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: '-0.35%', trend: 'down', size: 'large' },
    { symbol: 'ITC', name: 'ITC Ltd', price: '-1.19%', trend: 'down', size: 'normal' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: '+0.56%', trend: 'up', size: 'normal' },
  ];

  const StockCard = ({ stock }: { stock: any }) => {
    const isLarge = stock.size === 'large';
    const gridSize = isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1';
    
    // Intensity based on percentage
    const percentage = Math.abs(parseFloat(stock.price));
    const intensity = Math.min(percentage / 3, 1); // Normalize to 0-1
    
    const backgroundColor = stock.trend === 'up' 
      ? `rgba(34, 197, 94, ${0.3 + intensity * 0.4})` // Green with varying intensity
      : `rgba(239, 68, 68, ${0.3 + intensity * 0.4})`; // Red with varying intensity
    
    const borderColor = stock.trend === 'up' 
      ? `rgba(34, 197, 94, ${0.5 + intensity * 0.3})`
      : `rgba(239, 68, 68, ${0.5 + intensity * 0.3})`;

    // Function to get the correct image extension
    const getLogoSrc = (symbol: string) => {
      // Map of symbols to their actual file extensions
      const logoExtensions: { [key: string]: string } = {
        'AAPL': 'png',
        'MSFT': 'png', 
        'GOOGL': 'png',
        'AMZN': 'webp',
        'TSLA': 'webp',
        'META': 'png',
        'NVDA': 'jpg',
        'RELIANCE': 'jpg',
        'TCS': 'png',
        'INFY': 'png',
        'HDFCBANK': 'jpg',
        'BHARTIARTL': 'webp',
        'ITC': 'png',
        'SUNPHARMA': 'png'
      };
      
      const extension = logoExtensions[symbol] || 'png';
      return `/images/stocks/${symbol}.${extension}`;
    };

    return (
      <motion.div
        className={`relative p-3 rounded border cursor-pointer group ${gridSize}`}
        style={{ 
          backgroundColor,
          borderColor,
          minHeight: isLarge ? '120px' : '80px'
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: `0 4px 20px ${stock.trend === 'up' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Company Logo */}
        <div className="flex justify-center mb-2">
          <img
            src={getLogoSrc(stock.symbol)}
            alt={`${stock.name} logo`}
            className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} object-contain opacity-70 hover:opacity-90 transition-opacity duration-300`}
            onError={(e) => {
              // Fallback to colored dot if logo fails to load
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          {/* Fallback colored dot */}
          <div 
            className={`${isLarge ? 'w-4 h-4' : 'w-3 h-3'} rounded-full hidden opacity-70`}
            style={{
              backgroundColor: stock.trend === 'up' ? '#22c55e' : '#ef4444'
            }}
          />
        </div>
        
        {/* Stock Symbol */}
        <div className={`font-bold text-white text-center mb-1 ${isLarge ? 'text-lg' : 'text-sm'}`}>
          {stock.symbol}
        </div>
        
        {/* Price Change */}
        <div 
          className={`font-semibold text-center ${isLarge ? 'text-base' : 'text-xs'}`}
          style={{ 
            color: stock.trend === 'up' ? '#22c55e' : '#ef4444',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          {stock.price}
        </div>
        
        {/* Stock Name (only for large cards) */}
        {isLarge && (
          <div className="text-white/70 text-xs text-center mt-1 leading-tight">
            {stock.name}
          </div>
        )}
        
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded" />
      </motion.div>
    );
  };

  return (
    <section className="relative w-full py-16 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Same Grid Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div 
          className="absolute inset-0 w-full h-full opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-left mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #ef4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Market Enthusiast
          </h2>
          
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: '#C7C7D7' }}>
            Beyond coding, I'm passionate about financial markets and cryptocurrency. I enjoy analyzing market trends, studying technical analysis, and exploring the intersection of technology and finance.
          </p>
        </motion.div>

        {/* Compact Stock Heatmap - Two Sections Side by Side */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* International Markets */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🌍</span>
              Global Markets
            </h3>
            <div className="grid grid-cols-3 gap-2 auto-rows-fr">
              {internationalStocks.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          </div>

          {/* Indian Markets */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🇮🇳</span>
              Indian Markets
            </h3>
            <div className="grid grid-cols-3 gap-2 auto-rows-fr">
              {indianStocks.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Performance Legend */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Decline</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded"></div>
              <span>Neutral</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Growth</span>
            </div>
          </div>
        </motion.div>

        {/* Skills Tags */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {['Technical Analysis', 'Market Research', 'Personal Finance'].map((skill) => (
              <motion.span 
                key={skill}
                className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// OneStop Section
export function OneStopSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Same Grid Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div 
          className="absolute inset-0 w-full h-full opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Logo/Title */}
            <div className="space-y-4">
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.05em'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                ONESTOP
              </motion.h1>
              
              {/* Subtitle with gradient underline */}
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-lg md:text-xl text-gray-300 font-light">
                  Your Complete Development Solution
                </span>
                <div 
                  className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)'
                  }}
                />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              A comprehensive platform where I document my development journey, sharing insights, 
              challenges, and discoveries in the world of software engineering. From cutting-edge 
              technologies to practical solutions, everything you need in one place.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/onestop">
                <motion.div
                  suppressHydrationWarning
                  key="onestop-cta-button"
                  className="inline-flex items-center space-x-3 px-8 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                    boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 15px 40px rgba(168, 85, 247, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore OneStop</span>
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </motion.div>
              </Link>
            </motion.div>

            {/* Tags/Features */}
            <motion.div
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {['Development Insights', 'Tech Solutions', 'Code Tutorials', 'Project Showcases'].map((tag, index) => (
                <motion.span
                  key={`onestop-tag-${index}`}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Logo/Image Placeholder */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Large Logo Placeholder */}
            <div className="relative">
              {/* YouTube Video Card */}
              <motion.div
                className="w-96 h-64 md:w-[480px] md:h-80 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden cursor-pointer group shadow-2xl"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => window.open('https://youtu.be/nyAwJGNUHBc?feature=shared', '_blank')}
              >
                {/* YouTube Thumbnail */}
                <div className="absolute inset-0">
                  <Image
                    src="/images/thumbnail-yt.jpg"
                    alt="OneStop AI YouTube Video"
                    fill
                    className="object-cover rounded-2xl"
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40 rounded-2xl" />
                </div>
                {/* Play Button Overlay */}
                <div className="relative z-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </motion.div>
              {/* Caption below thumbnail */}
              <div className="w-96 md:w-[480px] mx-auto mt-4 text-center">
                <span className="inline-block text-xl md:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg px-2 py-1 rounded-lg">
                  Subscribe to OneStop AI - YT
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
