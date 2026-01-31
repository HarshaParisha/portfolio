'use client';

import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava, FaGitAlt, FaGithub, FaDocker, FaCode } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiMysql, SiPostman, SiIntellijidea, SiSpringboot, SiVercel, SiNetlify, SiRender, SiRailway, SiAdobephotoshop, SiAdobelightroom, SiAdobepremierepro, SiCanva } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';

const skillsData = {
  "Languages": [
    { name: "Java", icon: FaJava, color: "text-orange-500" },
    { name: "Python", icon: FaPython, color: "text-blue-400" },
    { name: "C", icon: FaCode, color: "text-blue-600" },
    { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
    { name: "HTML", icon: FaHtml5, color: "text-orange-600" },
    { name: "CSS", icon: FaCss3Alt, color: "text-blue-500" }
  ],
  "Frameworks & Libraries": [
    { name: "React", icon: FaReact, color: "text-cyan-400" },
    { name: "Spring Boot", icon: SiSpringboot, color: "text-green-500" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300" }
  ],
  "Databases": [
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "Oracle SQL", icon: BiLogoPostgresql, color: "text-red-500" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-400" },
    { name: "Supabase", icon: SiMongodb, color: "text-green-400" }
  ],
  "Development Tools": [
    { name: "VS Code", icon: FaCode, color: "text-blue-400" },
    { name: "IntelliJ IDEA", icon: SiIntellijidea, color: "text-red-500" },
    { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    { name: "GitHub", icon: FaGithub, color: "text-gray-300" },
    { name: "Postman", icon: SiPostman, color: "text-orange-500" }
  ],
  "CI/CD & Deployment": [
    { name: "Docker", icon: FaDocker, color: "text-blue-400" },
    { name: "Vercel", icon: SiVercel, color: "text-white" },
    { name: "Railway", icon: SiRailway, color: "text-purple-400" },
    { name: "Netlify", icon: SiNetlify, color: "text-cyan-400" },
    { name: "Render", icon: SiRender, color: "text-green-400" }
  ],
  "Embedded Systems": [
    { name: "Raspberry Pi", icon: FaPython, color: "text-red-500" },
    { name: "Arduino", icon: FaCode, color: "text-cyan-500" }
  ],
  "Creative Suite": [
    { name: "Photoshop", icon: SiAdobephotoshop, color: "text-blue-500" },
    { name: "Lightroom", icon: SiAdobelightroom, color: "text-blue-400" },
    { name: "Premiere Pro", icon: SiAdobepremierepro, color: "text-purple-500" },
    { name: "CapCut", icon: SiCanva, color: "text-white" },
    { name: "Photopea", icon: SiAdobephotoshop, color: "text-green-400" },
    { name: "Canva", icon: SiCanva, color: "text-purple-400" }
  ]
};

export default function SkillsSection() {
  return (
    <section 
      id="skills" 
      className="py-12 sm:py-16 md:py-20 bg-gray-900 relative"
      style={{
        backgroundImage: "url('/images/section3.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-green-400 font-mono text-lg">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Developer Arsenal
            </h2>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30 hover:bg-gray-800/60 transition-all duration-300 h-full">
                <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700/50">
                  {category}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-all duration-200 cursor-pointer"
                      suppressHydrationWarning
                    >
                      <skill.icon className={`text-xl ${skill.color} flex-shrink-0`} />
                      <span className="text-gray-300 text-sm font-medium truncate">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
            <p className="text-gray-300 leading-relaxed">
              My toolkit spans across various domains of software development, from frontend frameworks 
              to backend technologies, databases, deployment platforms, and creative tools. Always learning 
              and adapting to new technologies to build innovative solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
