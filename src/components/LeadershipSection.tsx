'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaCalendar } from 'react-icons/fa';
import { leadershipData } from '@/data/leadership';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="py-12 sm:py-16 md:py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <span className="text-green-400 font-mono text-sm sm:text-base md:text-lg">05.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Designed to Lead
            </h2>
            <div className="hidden sm:block flex-1 h-px bg-gray-700"></div>
          </div>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-4xl">
            A journey through leadership roles and achievements, showcasing growth and impact in 
            tech community engagement.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden lg:block absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-purple-400 to-transparent"></div>

          {/* Leadership Entries */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {leadershipData.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start"
              >
                {/* Year Badge - Left side on desktop */}
                <div className="lg:col-span-2 flex lg:justify-end">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    {/* Year Badge */}
                    <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md font-semibold text-sm sm:text-base shadow-lg shadow-purple-500/25">
                      {experience.year}
                    </div>
                    
                    {/* Timeline Dot - Hidden on mobile */}
                    <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2 w-2.5 h-2.5 bg-purple-500 rounded-full border-2 border-gray-900 shadow-lg shadow-purple-500/50"></div>
                  </motion.div>
                </div>

                {/* Experience Card - Right side */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="lg:col-span-10 group"
                >
                  <div className="bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
                    {/* Card Header */}
                    <div className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                            {experience.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <motion.a
                              href={experience.organizationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 font-medium text-sm sm:text-base flex items-center gap-1 transition-colors duration-200"
                              whileHover={{ x: 2 }}
                              suppressHydrationWarning
                            >
                              {experience.organization}
                              <FaExternalLinkAlt size={12} />
                            </motion.a>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-300 text-xs bg-purple-900/20 border border-purple-500/20 px-2 py-1 rounded">
                          <FaCalendar size={12} />
                          <span className="font-medium">{experience.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <motion.div
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: (index * 0.1) + (achievementIndex * 0.05) }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2 group/item"
                        >
                          <div className="flex-shrink-0 mt-1.5">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover/item:bg-purple-300 transition-colors duration-200"></div>
                          </div>
                          <p className="text-white leading-relaxed text-sm group-hover/item:text-purple-100 transition-colors duration-200">
                            {achievement}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <p className="text-white leading-relaxed text-base">
              Leadership isn't just about titles—it's about impact, growth, and empowering others to achieve 
              their best. Each role has shaped my approach to collaborative problem-solving and community building.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
