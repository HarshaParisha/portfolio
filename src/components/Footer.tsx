'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      href: 'https://github.com/HarshaParisha',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/parisha-harshavardhan-a2141b25b/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: 'https://www.instagram.com/harsha._.l4?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      color: 'hover:text-pink-500'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      href: 'mailto:harshaparisha@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href === '#home' ? 'body' : href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 pb-20 lg:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/logo.jpg"
                  alt="Harsha P Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Harsha
                </span>
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Frontend Developer passionate about creating beautiful, functional, 
              and user-friendly web experiences. Always learning, always building.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ name, icon: Icon, href, color }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${color} transition-colors duration-200`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={name}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                    suppressHydrationWarning
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-gray-300">
              <p>📧 harshaparisha@gmail.com</p>
              <p>📱 +91 7013706173</p>
              <p>📍 Hyderabad, India</p>
            </div>
            <motion.button
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).openStudioAssistant) {
                  (window as any).openStudioAssistant();
                } else if (typeof window !== 'undefined') {
                  // Fallback: navigate to collab-chat page
                  window.location.href = '/collab-chat';
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              suppressHydrationWarning
            >
              Let's Talk
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-2 text-center md:text-left">
            © {currentYear} Harsha. Made with <FaHeart className="text-red-500" size={14} /> and lots of ☕
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:space-x-6 text-xs sm:text-sm text-gray-400">
            <span>Built with Next.js & Tailwind CSS</span>
            <span>•</span>
            <span>Deployed on Vercel</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
