'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowRight, 
  FaUpload, 
  FaCheck, 
  FaRobot,
  FaRocket,
  FaBrain,
  FaPalette,
  FaEye,
  FaCog,
  FaEdit,
  FaVideo,
  FaQuestion,
  FaArrowLeft
} from 'react-icons/fa';

interface ChatData {
  welcomeChoice: string;
  serviceType: string;
  projectDescription: string;
  timeline: string;
  projectStatus: string;
  files?: FileList;
  name: string;
  email: string;
  whatsapp: string;
}

type ChatStep = 'welcome' | 'service' | 'idea' | 'timeline' | 'status' | 'contact' | 'confirmation';

export default function StudioAssistant() {
  const [currentStep, setCurrentStep] = useState<ChatStep>('welcome');
  const [chatData, setChatData] = useState<Partial<ChatData>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('studio-chat-data', JSON.stringify(chatData));
  }, [chatData]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('studio-chat-data');
    if (savedData) {
      setChatData(JSON.parse(savedData));
    }
  }, []);

  const handleChoice = (field: keyof ChatData, value: string) => {
    setChatData(prev => ({ ...prev, [field]: value }));
    
    // Navigate to next step
    const stepOrder: ChatStep[] = ['welcome', 'service', 'idea', 'timeline', 'status', 'contact', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setTimeout(() => {
        setCurrentStep(stepOrder[currentIndex + 1]);
      }, 300);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData),
      });

      if (response.ok) {
        setCurrentStep('confirmation');
        // Clear saved data on successful submission
        localStorage.removeItem('studio-chat-data');
      }
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-red-500/20 bg-black/40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                <FaRobot className="text-white text-lg" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                Studio Assistant
              </h1>
            </div>
            <motion.button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-400/50 text-red-100 hover:text-white rounded-xl transition-all duration-300 backdrop-blur-sm group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Portfolio</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-10"
            >
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-500/30">
                  <FaRobot className="text-white text-2xl" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                  Hey there!
                </h2>
                <p className="text-xl text-red-100/80 leading-relaxed max-w-2xl mx-auto">
                  I'm Harsha's studio assistant. Want to collaborate or explore AI/design ideas?
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { text: "Let's Build Something Cool", icon: FaRocket },
                  { text: "I Need Help with AI", icon: FaBrain },
                  { text: "I'm Exploring Design Possibilities", icon: FaPalette },
                  { text: "Just Looking Around", icon: FaEye }
                ].map((option) => (
                  <motion.button
                    key={option.text}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleChoice('welcomeChoice', option.text)}
                    className="w-full p-6 text-left bg-black/40 hover:bg-black/60 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group backdrop-blur-sm shadow-lg shadow-red-900/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600/30 transition-colors duration-300">
                          <option.icon className="text-red-400 text-lg" />
                        </div>
                        <span className="text-white font-semibold text-lg">{option.text}</span>
                      </div>
                      <FaArrowRight className="text-red-400 group-hover:text-red-300 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Service Selection Step */}
          {currentStep === 'service' && (
            <motion.div
              key="service"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-10"
            >
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                  Perfect!
                </h2>
                <p className="text-xl text-red-100/80 max-w-2xl mx-auto">
                  What kind of help are you looking for today?
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { text: "AI Automation", icon: FaCog },
                  { text: "Prompt Writing and Custom Bots", icon: FaEdit },
                  { text: "Poster or Reels Editing", icon: FaVideo },
                  { text: "Not Sure Yet", icon: FaQuestion }
                ].map((option) => (
                  <motion.button
                    key={option.text}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleChoice('serviceType', option.text)}
                    className="w-full p-6 text-left bg-black/40 hover:bg-black/60 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group backdrop-blur-sm shadow-lg shadow-red-900/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600/30 transition-colors duration-300">
                          <option.icon className="text-red-400 text-lg" />
                        </div>
                        <span className="text-white font-semibold text-lg">{option.text}</span>
                      </div>
                      <FaArrowRight className="text-red-400 group-hover:text-red-300 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Idea Sharing Step */}
          {currentStep === 'idea' && (
            <motion.div
              key="idea"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                  Tell me more
                </h2>
                <p className="text-xl text-red-100/80 max-w-2xl mx-auto">
                  Share your project idea or what you're trying to achieve
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 shadow-lg shadow-red-900/20">
                <textarea
                  value={chatData.projectDescription || ''}
                  onChange={(e) => setChatData(prev => ({ ...prev, projectDescription: e.target.value }))}
                  placeholder="Describe your project, goals, or what you need help with..."
                  className="w-full h-40 bg-red-900/20 border border-red-500/30 rounded-xl text-white placeholder-red-200/50 focus:outline-none focus:border-red-400/60 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 p-4 text-lg resize-none backdrop-blur-sm"
                />
                
                <div className="mt-6 flex justify-center">
                  <motion.button
                    onClick={() => chatData.projectDescription && handleChoice('projectDescription', chatData.projectDescription)}
                    disabled={!chatData.projectDescription?.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Continue</span>
                    <FaArrowRight />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Timeline Step */}
          {currentStep === 'timeline' && (
            <motion.div
              key="timeline"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-10"
            >
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                  Timeline
                </h2>
                <p className="text-xl text-red-100/80 max-w-2xl mx-auto">
                  When are you hoping to start or see results?
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { text: "Urgent (next 1–2 weeks)", icon: FaRocket },
                  { text: "Normal (1–2 months)", icon: FaCog },
                  { text: "Just exploring", icon: FaEye }
                ].map((option) => (
                  <motion.button
                    key={option.text}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleChoice('timeline', option.text)}
                    className="w-full p-6 text-left bg-black/40 hover:bg-black/60 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group backdrop-blur-sm shadow-lg shadow-red-900/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600/30 transition-colors duration-300">
                          <option.icon className="text-red-400 text-lg" />
                        </div>
                        <span className="text-white font-semibold text-lg">{option.text}</span>
                      </div>
                      <FaArrowRight className="text-red-400 group-hover:text-red-300 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Status Step */}
          {currentStep === 'status' && (
            <motion.div
              key="status"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-10"
            >
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                  Project Status
                </h2>
                <p className="text-xl text-red-100/80 max-w-2xl mx-auto">
                  Where are you in your journey?
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { text: "I have a clear vision", icon: FaBrain },
                  { text: "I have some ideas but need guidance", icon: FaQuestion },
                  { text: "I'm starting from scratch", icon: FaRocket }
                ].map((option) => (
                  <motion.button
                    key={option.text}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleChoice('projectStatus', option.text)}
                    className="w-full p-6 text-left bg-black/40 hover:bg-black/60 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group backdrop-blur-sm shadow-lg shadow-red-900/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600/30 transition-colors duration-300">
                          <option.icon className="text-red-400 text-lg" />
                        </div>
                        <span className="text-white font-semibold text-lg">{option.text}</span>
                      </div>
                      <FaArrowRight className="text-red-400 group-hover:text-red-300 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact Info Step */}
          {currentStep === 'contact' && (
            <motion.div
              key="contact"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-10"
            >
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                  Let's connect!
                </h2>
                <p className="text-xl text-red-100/80 max-w-2xl mx-auto">
                  How can Harsha reach out to you?
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 shadow-lg shadow-red-900/20 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-red-100 mb-3">Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-white placeholder-red-200/50 focus:outline-none focus:border-red-400/60 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 backdrop-blur-sm"
                    value={chatData.name || ''}
                    onChange={(e) => setChatData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-100 mb-3">Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-white placeholder-red-200/50 focus:outline-none focus:border-red-400/60 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 backdrop-blur-sm"
                    value={chatData.email || ''}
                    onChange={(e) => setChatData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-red-100 mb-3">WhatsApp (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    className="w-full p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-white placeholder-red-200/50 focus:outline-none focus:border-red-400/60 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 backdrop-blur-sm"
                    value={chatData.whatsapp || ''}
                    onChange={(e) => setChatData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  />
                </div>

                <div className="flex justify-center mt-8">
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!chatData.name?.trim() || !chatData.email?.trim() || isLoading}
                    className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                    {!isLoading && <FaArrowRight />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Confirmation Step */}
          {currentStep === 'confirmation' && (
            <motion.div
              key="confirmation"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-10 text-center"
            >
              <div className="space-y-8">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
                  <FaCheck className="text-white text-3xl" />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                    Awesome!
                  </h2>
                  <p className="text-xl text-red-100/80 max-w-2xl mx-auto leading-relaxed">
                    Thanks for reaching out. Harsha will get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.button
                    onClick={() => window.history.back()}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/40 flex items-center gap-3 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaArrowLeft />
                    <span>Back to Portfolio</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => window.open('https://github.com/HarshaParisha', '_blank')}
                    className="px-6 py-3 border border-red-500/30 hover:border-red-400/50 text-red-100 hover:text-white rounded-xl font-medium hover:bg-red-600/20 transition-all duration-300 backdrop-blur-sm flex items-center gap-3 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Check out GitHub</span>
                    <FaArrowRight />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
