'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaReact, FaJs, FaHtml5, FaCss3Alt, FaPython } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiSpringboot, SiStreamlit, SiPython } from 'react-icons/si';

const projectsData = [
  {
    id: 'scanmymeds',
    title: 'ScanMyMeds',
    subtitle: 'Medicine Verification Platform',
    description: 'A smart platform to scan or search medicines and instantly verify their authenticity and safety.',
    technologies: [
      { name: 'React', icon: FaReact, color: 'text-cyan-400' },
      { name: 'Node / Serverless', icon: FaJs, color: 'text-yellow-400' },
      { name: 'Image Scanning & OCR', icon: FaHtml5, color: 'text-orange-500' },
      { name: 'Verification APIs', icon: SiNextdotjs, color: 'text-black' }
    ],
    metrics: [
      'Medicine scanning & lookup',
      'Fake vs genuine detection',
      'Quick safety verification',
      'Clean, easy-to-use interface'
    ],
    imageUrl: '/images/scanmymeds-project.jpg',
    githubUrl: '',
    liveUrl: 'https://scanmymeds.lovable.app/',
    videoUrl: ''
  },
  {
    id: 'onestopai',
    title: 'OneStop AI',
    subtitle: 'AI Productivity Hub',
    description: 'An all-in-one platform that brings multiple AI tools together to help users create content, research, analyze data, and automate tasks efficiently.',
    technologies: [
      { name: 'React', icon: FaReact, color: 'text-cyan-400' },
      { name: 'AI APIs (LLMs)', icon: SiTypescript, color: 'text-purple-400' },
      { name: 'Tailwind / CSS', icon: SiTailwindcss, color: 'text-blue-400' },
      { name: 'Node / Serverless Backend', icon: FaJs, color: 'text-yellow-400' }
    ],
    metrics: [
      'Unified access to multiple AI tools',
      'Smart content generation & insights',
      'Productivity automation and workflows',
      'Clean, adaptive UI for fast usage'
    ],
    imageUrl: '/images/onestopai-project.jpg',
    githubUrl: '',
    liveUrl: 'https://onestopai.lovable.app/',
    videoUrl: ''
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <span className="text-green-400 font-mono text-sm sm:text-base md:text-lg">04.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Things I've Built
            </h2>
            <div className="hidden sm:block flex-1 h-px bg-gray-700"></div>
          </div>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-4xl">
            Real-world applications built with thoughtful design, full-stack technologies, and measurable impact.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/20 hover:border-purple-500/30 transition-all duration-300">
                <div className="grid grid-cols-1 h-full">
                  {/* Project Details */}
                  <div className="p-4 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="mb-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <span className="text-purple-400 text-xs font-medium px-2 py-1 bg-purple-500/10 rounded">
                            {project.subtitle}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm">
                          {project.description}
                        </p>
                      </div>

                      {/* Metrics */}
                      <div className="mb-3 sm:mb-4">
                        {project.metrics.map((metric, metricIndex) => (
                          <div key={metricIndex} className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            <span className="text-gray-300 text-xs">{metric}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
                        {project.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center gap-1 sm:gap-1.5 bg-gray-700/30 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg border border-gray-600/30"
                          >
                            <tech.icon className={`text-sm ${tech.color}`} />
                            <span className="text-gray-300 text-xs font-medium">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Section - Action Buttons */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200 p-2"
                        suppressHydrationWarning
                      >
                        <FaGithub size={20} />
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200 p-2"
                        suppressHydrationWarning
                      >
                        <FaExternalLinkAlt size={18} />
                      </motion.a>
                      <motion.a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200 p-2"
                        suppressHydrationWarning
                      >
                        <FaPlay size={18} />
                      </motion.a>
                    </div>
                  </div>

                  {/* View Project Button for mobile */}
                  <div className="p-4 pt-0 sm:p-6 sm:pt-0">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 text-center text-sm sm:text-base"
                      suppressHydrationWarning
                    >
                      View Project →
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-8 border border-gray-700/20">
            <p className="text-gray-300 leading-relaxed text-lg">
              Each project represents a unique challenge solved with modern technologies and best practices. 
              From Chrome extensions to full-stack web applications, I focus on creating solutions that 
              deliver real value and measurable impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
