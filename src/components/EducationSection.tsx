'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { educationData } from '@/data/education';
import { useState } from 'react';

// Institution Logo Component with fallback
interface InstitutionLogoProps {
  institution: string;
  shortName: string;
  fallbackColor: string;
  degree?: string; // Add degree to help with mapping
}

const InstitutionLogo: React.FC<InstitutionLogoProps> = ({ institution, shortName, fallbackColor, degree }) => {
  const [imageError, setImageError] = useState(false);
  
  // Get logo path based on institution name and degree
  const getLogoPath = (name: string, degreeType?: string) => {
    // Direct mapping for known institutions
    if (name === 'Anurag University') {
      return '/images/education/anurag-university.png';
    }
    
    // For Shree SwamiNarayan Gurukul : HYD, use different logos based on degree
    if (name === 'Shree SwamiNarayan Gurukul : HYD') {
      if (degreeType?.includes('Higher Secondary')) {
        return '/images/education/johnson-grammar-school.jpg';
      } else if (degreeType?.includes('Secondary School')) {
        return '/images/education/sarathi-school.png';
      }
    }

    // Fallback to name-based mapping for other cases
    const cleanName = name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    
    const fileMap: { [key: string]: string } = {
      'anurag-university': 'png',
      'johnson-grammar-school': 'jpg', 
      'sarathi-school': 'png'
    };
    
    const extension = fileMap[cleanName] || 'png';
    return `/images/education/${cleanName}.${extension}`;
  };

  const logoSrc = getLogoPath(institution, degree);

  if (imageError) {
    return (
      <div className={`w-12 h-12 bg-gradient-to-br ${fallbackColor} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md`}>
        {shortName}
      </div>
    );
  }

  return (
    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden">
      <img
        src={logoSrc}
        alt={`${institution} logo`}
        className="w-10 h-10 object-contain rounded"
        onError={() => setImageError(true)}
        onLoad={() => setImageError(false)}
      />
    </div>
  );
};

export default function EducationSection() {
  return (
    <section id="education" className="relative py-12 sm:py-16 md:py-20 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Clean Grid Background Pattern - matching homepage style */}
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

      {/* Subtle Gradient Overlays for Depth - matching homepage */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-pink-900/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-64 bg-gradient-to-r from-blue-900/5 via-transparent to-indigo-900/5 transform -translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-green-400 font-mono text-lg">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Education
            </h2>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>
        </motion.div>

        {/* Education List */}
        <div className="space-y-4">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-4 border border-gray-600/40 hover:bg-gray-800/70 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex items-start gap-4">
                  {/* Institution Logo */}
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <InstitutionLogo
                      institution={edu.institution}
                      shortName={edu.institutionShort}
                      fallbackColor={edu.color}
                      degree={edu.degree}
                    />
                  </motion.div>

                  {/* Education Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                            {edu.degree}
                          </h3>
                          {edu.link && (
                            <motion.a
                              href={edu.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                              aria-label={`Visit ${edu.institution} website`}
                              suppressHydrationWarning
                            >
                              <FaExternalLinkAlt size={12} />
                            </motion.a>
                          )}
                        </div>
                        <p className="text-purple-400 font-medium text-sm">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="text-right space-y-1 flex-shrink-0">
                        <p className="text-gray-400 text-sm font-medium">
                          {edu.duration}
                        </p>
                        <p className="text-base font-bold text-white">
                          {edu.grade}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mt-2">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
