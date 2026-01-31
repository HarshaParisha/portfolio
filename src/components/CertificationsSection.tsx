'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLeaf, FaExternalLinkAlt, FaMicrosoft, FaLinkedin, FaGoogle } from 'react-icons/fa';
import { certificationsData } from '@/data/certifications';

const iconMap = {
  github: FaGithub,
  leaf: FaLeaf,
  microsoft: FaMicrosoft,
  linkedin: FaLinkedin,
  google: FaGoogle,
};

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-12 sm:py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <span className="text-green-400 font-mono text-sm sm:text-base md:text-lg">06.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Certifications
            </h2>
            <div className="hidden sm:block flex-1 h-px bg-gray-700"></div>
          </div>
        </motion.div>

        {/* Certifications Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {certificationsData.map((cert, index) => {
            const IconComponent = iconMap[cert.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="group relative"
              >
                {/* Rectangle Card */}
                <div className="relative bg-black/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-gray-700/40 hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-xl group-hover:shadow-purple-500/20">
                  
                  {/* Background Glow Effect - Only on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-gray-600/30 group-hover:border-purple-500/40 transition-all duration-300">
                        <IconComponent 
                          className={`text-xl sm:text-2xl ${cert.color} group-hover:scale-110 transition-transform duration-300`} 
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-purple-200 transition-colors duration-300 line-clamp-2 sm:truncate">
                        {cert.title}
                      </h3>

                      {/* Organization */}
                      <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 truncate">
                        {cert.organization}
                      </p>

                      {/* Year and Link */}
                      <div className="flex items-center gap-2">
                        <span className={`${cert.color} font-semibold text-sm`}>
                          {cert.year}
                        </span>
                        {cert.url && (
                          <motion.a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            suppressHydrationWarning
                          >
                            <FaExternalLinkAlt size={10} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Glow Border - Only on Hover */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
                </div>

                {/* Floating Shadow - Only on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-20 transform translate-y-2"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20">
            <p className="text-gray-300 leading-relaxed text-base">
              Continuous learning through industry-recognized certifications, staying updated with the latest 
              technologies and best practices in software development and cloud computing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
