'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  FaArrowRight, 
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
  FaArrowLeft,
  FaPaperPlane,
  FaUser,
  FaSpinner,
  FaChevronRight
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

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: Array<{ text: string; value: string; icon?: any }>;
  isTyping?: boolean;
}

interface StudioChatbotProps {
  onClose?: () => void;
}

type ChatStep = 'welcome' | 'service' | 'idea' | 'timeline' | 'status' | 'contact' | 'confirmation';

const StudioChatbot = ({ onClose }: StudioChatbotProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ChatStep>('welcome');
  const [chatData, setChatData] = useState<Partial<ChatData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Track mount state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'bot',
      content: "Hello! I'm Harsha's AI collaboration assistant. I'm here to understand your project needs and connect you with the right solutions. Whether you're looking to build cutting-edge AI applications, create stunning digital experiences, or explore innovative tech solutions, I'm here to help guide the conversation.\n\nWhat brings you here today?",
      timestamp: new Date(),
      options: [
        { text: "I want to build an AI solution", value: "ai-solution", icon: FaBrain },
        { text: "I need web/app development", value: "development", icon: FaRocket },
        { text: "I'm exploring design & UX", value: "design", icon: FaPalette },
        { text: "I have a startup idea", value: "startup", icon: FaEye },
        { text: "I need technical consultation", value: "consultation", icon: FaQuestion }
      ]
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [messages]);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    // Auto-scroll to bottom on new message
    setTimeout(() => scrollToBottom(), 100);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = (callback: () => void, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleOptionClick = (option: { text: string; value: string; icon?: any }) => {
    // Add user message
    addMessage({
      type: 'user',
      content: option.text
    });

    // Update chat data
    setChatData(prev => ({ ...prev, welcomeChoice: option.text }));

    // Simulate bot response based on selection
    simulateTyping(() => {
      if (option.value === 'ai-solution') {
        addMessage({
          type: 'bot',
          content: "Excellent choice! AI is transforming industries rapidly. Let me understand your specific needs better.\n\nWhat type of AI solution are you considering?",
          options: [
            { text: "ChatGPT-like conversational AI", value: "conversational-ai", icon: FaEdit },
            { text: "Computer Vision & Image Processing", value: "computer-vision", icon: FaEye },
            { text: "Data Analysis & ML Models", value: "ml-models", icon: FaBrain },
            { text: "AI Automation & Workflows", value: "ai-automation", icon: FaCog },
            { text: "Not sure, need guidance", value: "ai-guidance", icon: FaQuestion }
          ]
        });
        setCurrentStep('service');
      } else if (option.value === 'development') {
        addMessage({
          type: 'bot',
          content: "Perfect! Modern web and app development is my forte. I work with cutting-edge technologies to create scalable, performant solutions.\n\nWhat kind of development project do you have in mind?",
          options: [
            { text: "Full-stack web application", value: "fullstack-web", icon: FaRocket },
            { text: "Mobile app (React Native/Flutter)", value: "mobile-app", icon: FaCog },
            { text: "E-commerce platform", value: "ecommerce", icon: FaEdit },
            { text: "SaaS product development", value: "saas", icon: FaBrain },
            { text: "API & Backend services", value: "backend", icon: FaVideo }
          ]
        });
        setCurrentStep('service');
      } else if (option.value === 'design') {
        addMessage({
          type: 'bot',
          content: "Great! Design thinking and user experience are crucial for any successful digital product. I focus on creating intuitive, beautiful interfaces that users love.\n\nWhat aspect of design interests you most?",
          options: [
            { text: "UI/UX Design & Prototyping", value: "ui-ux", icon: FaPalette },
            { text: "Brand Identity & Visual Design", value: "branding", icon: FaEdit },
            { text: "User Research & Testing", value: "user-research", icon: FaEye },
            { text: "Design System Creation", value: "design-system", icon: FaCog },
            { text: "Product Design Strategy", value: "product-design", icon: FaBrain }
          ]
        });
        setCurrentStep('service');
      } else if (option.value === 'startup') {
        addMessage({
          type: 'bot',
          content: "Exciting! Turning ideas into successful products is what I'm passionate about. I can help you navigate the technical aspects of bringing your startup vision to life.\n\nWhere are you in your startup journey?",
          options: [
            { text: "I have an idea, need technical validation", value: "idea-validation", icon: FaBrain },
            { text: "Need MVP development", value: "mvp-development", icon: FaRocket },
            { text: "Looking for a technical co-founder", value: "cofounder", icon: FaEdit },
            { text: "Need to scale existing product", value: "scaling", icon: FaCog },
            { text: "Seeking technical mentorship", value: "mentorship", icon: FaQuestion }
          ]
        });
        setCurrentStep('service');
      } else if (option.value === 'consultation') {
        addMessage({
          type: 'bot',
          content: "I'd be happy to provide technical consultation! With experience across multiple domains, I can help you make informed decisions about technology choices, architecture, and implementation strategies.\n\nWhat area would you like to discuss?",
          options: [
            { text: "Technology stack selection", value: "tech-stack", icon: FaCog },
            { text: "Architecture & System design", value: "architecture", icon: FaBrain },
            { text: "Performance optimization", value: "performance", icon: FaRocket },
            { text: "Security & best practices", value: "security", icon: FaEdit },
            { text: "Team & project management", value: "project-mgmt", icon: FaQuestion }
          ]
        });
        setCurrentStep('service');
      } else {
        addMessage({
          type: 'bot',
          content: "That's perfectly fine! Sometimes the best collaborations start with exploration. Feel free to browse around, and if any questions come up, I'm here to help. What would you like to know more about?"
        });
      }
    }, 1200);
  };

  const handleServiceClick = (option: { text: string; value: string }) => {
    addMessage({
      type: 'user',
      content: option.text
    });

    setChatData(prev => ({ ...prev, serviceType: option.text }));

    simulateTyping(() => {
      // Enhanced responses based on specific service selection
      let responseContent = "";
      
      if (option.value.includes('ai') || option.value.includes('ml') || option.value.includes('conversational')) {
        responseContent = "Excited to connect!\n\nAI is evolving fast and I find myself right where creativity meets intelligent systems. I work as an AI solutions architect, automation strategist, and content systems designer - blending research with design to build smart and scalable experiences.\n\nOver time, I have explored more than five hundred AI tools spanning automation, productivity, content, and visual design.\n\nWhether it's about streamlining workflows, writing better prompts, or crafting visuals that truly stand out, I help creators, founders, and teams use AI in ways that actually make sense.\n\nTell me more about your idea:\n• What are you trying to solve or make better?\n• Who is this meant for?\n• Do you already have tools in mind, or are you open to exploring new ones?\n\nLet's build something valuable together!";
      } else if (option.value.includes('web') || option.value.includes('fullstack') || option.value.includes('saas')) {
        responseContent = "Excellent choice! I specialize in building modern, scalable web applications that drive real business results.\n\nMy approach combines cutting-edge technologies like Next.js, React, TypeScript, and cloud infrastructure to create high-performance solutions. I focus on user experience, security, and scalability from day one.\n\nRecent projects include e-commerce platforms handling thousands of transactions, SaaS applications serving global users, and enterprise dashboards with real-time analytics.\n\nTo craft the perfect solution for you:\n• What's the core problem you're solving for your users?\n• Do you need real-time features, payment processing, or data analytics?\n• Are you targeting specific industries or user demographics?\n• What's your vision for scaling this application?\n\nLet's build something that makes a real impact!";
      } else if (option.value.includes('mobile')) {
        responseContent = "Mobile-first is the future! I create cross-platform applications that feel native while maximizing development efficiency.\n\nUsing React Native and Flutter, I've built apps ranging from productivity tools to social platforms, all optimized for performance and user engagement. My mobile solutions integrate seamlessly with backend services and provide offline capabilities when needed.\n\nI focus on intuitive UI/UX design, smooth animations, and platform-specific optimizations to ensure your app stands out in crowded app stores.\n\nLet's explore your mobile vision:\n• What unique value will your app provide to users?\n• Do you need features like push notifications, geolocation, or camera integration?\n• Are you planning for both iOS and Android, or starting with one platform?\n• How will users discover and engage with your app?\n\nTogether, we'll create a mobile experience users love!";
      } else if (option.value.includes('design') || option.value.includes('ui')) {
        responseContent = "Design is where strategy meets creativity! I believe great design doesn't just look good—it solves problems and drives results.\n\nMy design process starts with deep user research and business understanding. I create design systems that scale, prototypes that validate ideas, and interfaces that convert visitors into customers.\n\nFrom wireframes to pixel-perfect implementations, I ensure every element serves a purpose. I've helped startups achieve 40% higher conversion rates and established brands modernize their digital presence.\n\nLet's design something exceptional:\n• Who are your users and what are their biggest pain points?\n• What actions do you want users to take on your platform?\n• Do you have existing brand guidelines, or are we starting fresh?\n• What emotions should your design evoke in users?\n\nLet's create designs that truly connect with your audience!";
      } else if (option.value.includes('startup') || option.value.includes('mvp')) {
        responseContent = "Startup life is exhilarating! I understand the unique challenges of building something from zero to market-ready.\n\nHaving worked with numerous startups, I know that speed, validation, and smart resource allocation are critical. I help founders build MVPs that test core hypotheses while laying the foundation for future scaling.\n\nMy startup approach focuses on rapid prototyping, user feedback loops, and data-driven iterations. I've helped startups secure funding, acquire first customers, and scale to thousands of users.\n\nLet's turn your vision into reality:\n• What problem are you solving that others aren't addressing well?\n• Have you identified your ideal customer and validated the problem with them?\n• What's your hypothesis about the minimum feature set needed for validation?\n• How do you plan to measure success and gather user feedback?\n\nEvery unicorn started as an idea—let's build your foundation for success!";
      } else {
        responseContent = "Perfect! I love exploring new challenges and finding creative solutions.\n\nMy diverse experience across AI, development, design, and consulting means I can approach problems from multiple angles. Whether you're looking to optimize existing processes, explore emerging technologies, or solve complex technical challenges, I'm here to help.\n\nI believe the best solutions come from truly understanding the problem space and the people involved. Let's dive deep and find the right approach for your unique situation.\n\nLet's explore together:\n• What's the challenge or opportunity you're facing?\n• What have you tried so far, and what's been working or not working?\n• What would success look like for you in 6-12 months?\n• Are there any constraints or requirements I should know about?\n\nLet's discover the perfect solution for your needs!";
      }

      addMessage({
        type: 'bot',
        content: responseContent,
        options: []
      });
      setCurrentStep('idea');
    }, 1500);
  };

  const handleTextSubmit = () => {
    if (!inputValue.trim()) return;

    addMessage({
      type: 'user',
      content: inputValue
    });

    if (currentStep === 'idea') {
      setChatData(prev => ({ ...prev, projectDescription: inputValue }));
      
      simulateTyping(() => {
        addMessage({
          type: 'bot',
          content: "Great! When are you hoping to start or see results?",
          options: [
            { text: "Urgent (1-2 weeks)", value: "urgent", icon: FaRocket },
            { text: "Normal (1-2 months)", value: "normal", icon: FaCog },
            { text: "Just exploring", value: "exploring", icon: FaEye }
          ]
        });
        setCurrentStep('timeline');
      });
    } else if (currentStep === 'contact') {
      // Handle contact form submission
      handleFinalSubmit();
    }

    setInputValue('');
  };

  const handleTimelineClick = (option: { text: string; value: string }) => {
    addMessage({
      type: 'user',
      content: option.text
    });

    setChatData(prev => ({ ...prev, timeline: option.text }));

    simulateTyping(() => {
      let responseContent = "";
      
      if (option.value === 'urgent') {
        responseContent = "I understand the urgency! Time-critical projects require strategic focus and efficient execution.\n\nFor rapid delivery, I leverage proven frameworks, prioritize core functionality, and implement agile development cycles. My experience with urgent projects has taught me that smart compromises and clear communication are key to success.\n\nMy rapid development approach includes:\n• MVP-first mindset focusing on essential features\n• Pre-built components and tested frameworks for faster deployment\n• Daily progress updates and rapid iteration cycles\n• Strategic technical debt management for future scalability\n\nQuick question to optimize our approach:";
      } else if (option.value === 'normal') {
        responseContent = "Perfect timeline for building something exceptional! This timeframe allows us to implement best practices and create a truly polished solution.\n\nWith proper time allocation, we can focus on user research, comprehensive testing, scalable architecture, and delightful user experiences. This approach typically results in lower maintenance costs and higher user satisfaction.\n\nOur comprehensive approach will include:\n• Thorough discovery and planning phase with stakeholder alignment\n• Iterative design and development with user feedback integration\n• Comprehensive testing including performance and security audits\n• Documentation and knowledge transfer for long-term success\n\nTo craft the perfect strategy:";
      } else {
        responseContent = "Exploration phase is invaluable! Taking time to research and validate ideas often prevents costly mistakes and leads to breakthrough solutions.\n\nI can help you navigate the discovery process, evaluate different approaches, and build prototypes that test key assumptions. This phase is perfect for market research, competitive analysis, and technical feasibility studies.\n\nDuring exploration, we can focus on:\n• Market opportunity analysis and competitive landscape mapping\n• Technical feasibility studies and architecture planning\n• User research and prototype testing for early validation\n• ROI projections and resource planning for full development\n\nTo guide our exploration effectively:";
      }

      addMessage({
        type: 'bot',
        content: responseContent,
        options: [
          { text: "I have a detailed plan and specifications", value: "detailed-plan", icon: FaBrain },
          { text: "I have a general idea but need help refining", value: "general-idea", icon: FaQuestion },
          { text: "I'm starting completely from scratch", value: "from-scratch", icon: FaRocket },
          { text: "I have some research but need technical guidance", value: "need-guidance", icon: FaEdit }
        ]
      });
      setCurrentStep('status');
    }, 1800);
  };

  const handleStatusClick = (option: { text: string; value: string }) => {
    addMessage({
      type: 'user',
      content: option.text
    });

    setChatData(prev => ({ ...prev, projectStatus: option.text }));

    simulateTyping(() => {
      let responseContent = "";
      
      if (option.value === 'detailed-plan') {
        responseContent = "Excellent! Having detailed specifications is a huge advantage—it shows thoughtful planning and clear vision.\n\nWith comprehensive documentation, I can provide accurate estimates, identify potential technical challenges early, and suggest optimizations that could save time and costs. This foundation allows us to move quickly into development while maintaining high quality standards.\n\nMy detailed plan review process includes:\n• Technical architecture assessment and optimization recommendations\n• Risk analysis and mitigation strategy development\n• Resource allocation and timeline refinement\n• Technology stack validation and potential improvements\n\nI'm excited to review your plans and help bring this vision to life with precision and expertise!";
      } else if (option.value === 'general-idea') {
        responseContent = "That's the perfect starting point! Many successful products begin with a clear vision that gets refined through collaboration and expertise.\n\nI specialize in transforming big ideas into actionable development plans. Through structured discovery sessions, user journey mapping, and technical planning, we'll create a roadmap that balances ambition with practical execution.\n\nOur refinement process will cover:\n• Feature prioritization and user story development\n• Technical architecture planning and technology selection\n• UI/UX wireframing and user experience design\n• Development phasing and milestone planning\n\nTogether, we'll transform your vision into a detailed blueprint for success!";
      } else if (option.value === 'from-scratch') {
        responseContent = "Starting from zero is exciting—it means unlimited creative potential and the freedom to build something truly innovative!\n\nI love the challenge of turning abstract concepts into concrete solutions. My process involves deep market research, user needs analysis, and systematic ideation to identify opportunities that others might miss.\n\nOur from-scratch journey will include:\n• Market opportunity analysis and competitive research\n• User persona development and needs validation\n• Concept ideation and rapid prototyping\n• Technical feasibility assessment and roadmap creation\n\nSome of the most successful products started exactly where you are—with curiosity and determination. Let's build something remarkable!";
      } else {
        responseContent = "Perfect combination! Research insights plus technical expertise often leads to the most innovative and market-fit solutions.\n\nI excel at bridging the gap between research findings and practical implementation. Your domain knowledge combined with my technical experience creates a powerful foundation for building solutions that truly solve real problems.\n\nOur collaboration approach will focus on:\n• Research synthesis and technical requirement translation\n• Solution architecture design based on your insights\n• Prototype development for concept validation\n• Iterative development with continuous research integration\n\nLet's combine your research expertise with cutting-edge technical implementation to create something truly impactful!";
      }

      addMessage({
        type: 'bot',
        content: responseContent + "\n\nTo move forward, I'd love to connect you directly with Harsha. Please share your contact details, and he'll reach out to discuss your project in detail."
      });
      setCurrentStep('contact');
    }, 2000);
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Parse contact information from input
      const contactParts = inputValue.split(',').map(part => part.trim());
      const [name = '', email = '', whatsapp = ''] = contactParts;
      
      // Prepare complete data for submission
      const finalData = {
        ...chatData,
        name: name || 'Not provided',
        email: email || 'Not provided', 
        whatsapp: whatsapp || undefined,
        contactInfo: inputValue
      };

      console.log('📤 Submitting studio inquiry:', finalData);

      const response = await fetch('/api/chat-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (response.ok) {
        simulateTyping(() => {
          addMessage({
            type: 'bot',
            content: `🎉 Perfect! Thank you for sharing your project details with me.

${result.whatsappSent ? 
  '✅ Harsha has been instantly notified via WhatsApp and will reach out within 24 hours.' : 
  '📧 Your inquiry has been received successfully. Harsha will contact you soon via email or phone.'
}

While you wait, feel free to:
• Explore the latest projects and technical expertise
• Connect on professional networks for updates  
• Check out cutting-edge work and innovations

Looking forward to discussing your project and bringing your vision to life! 🚀

Ready to explore more or connect directly?`,
            options: [
              { text: "View GitHub Projects", value: "github" },
              { text: "Back to Portfolio", value: "back" }
            ]
          });
          setCurrentStep('confirmation');
        });
      } else {
        // Handle API error
        addMessage({
          type: 'bot',
          content: `❌ Something went wrong: ${result.message || 'Please try again.'}\n\nAlternatively, you can reach out directly:\n📧 Email: contact@harshaparisha.tech\n📱 WhatsApp: +91 7013706173`
        });
      }
    } catch (error) {
      console.error('💥 Failed to submit inquiry:', error);
      addMessage({
        type: 'bot',
        content: "❌ Connection error occurred. Please try again or contact directly:\n\n📧 Email: contact@harshaparisha.tech\n📱 WhatsApp: +91 7013706173\n🔗 LinkedIn: /in/harshaparisha"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalAction = (action: string) => {
    if (action === 'github') {
      window.open('https://github.com/HarshaParisha', '_blank');
    } else {
      sessionStorage.setItem('internalNavigation', 'true');
      window.location.href = '/';
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 h-full w-full bg-slate-900 z-50 flex flex-col" suppressHydrationWarning>
      {/* Enhanced Full-Screen Background with Perfect Design */}
      <div className="absolute inset-0 z-0">
        {/* Main Background Image - Full Screen with Perfect Fit */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-sm"
          style={{
            backgroundImage: `url('/images/collab-chat-bg.jpg')`,
            filter: 'blur(2px) brightness(0.4) contrast(1.1)',
          }}
        ></div>
        
        {/* Enhanced Gradient Overlays for Perfect Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-slate-900/20"></div>
        
        {/* Subtle Pattern Overlay for Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/10 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Header - GitHub Copilot Style with Back Button - Mobile Optimized */}
        <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl shadow-sm flex-shrink-0">
          <div className="max-w-4xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Back Button - Mobile Optimized */}
              <button
                onClick={() => {
                  console.log('Back button clicked - navigating to home');
                  // Mark that user is navigating internally to skip intro
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('internalNavigation', 'true');
                  }
                  // Close modal first, then navigate
                  onClose?.();
                  // Navigate to home page
                  router.push('/');
                }}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 transition-all duration-200 text-slate-300 hover:text-white"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-xs sm:text-sm">Back</span>
              </button>
              
              {/* Center Title - Mobile Optimized */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center">
                <div className="relative">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                    <FaRobot className="text-white text-xs sm:text-sm" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-slate-900">
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-base sm:text-lg font-medium text-slate-100">Studio Assistant</h1>
                  <p className="text-xs text-slate-400">AI collaboration partner</p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-sm font-medium text-slate-100">Studio Assistant</h1>
                </div>
              </div>
              
              {/* Spacer for alignment - hidden on mobile */}
              <div className="w-[60px] sm:w-[88px]"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Chat Container with Improved Contrast - Mobile Optimized */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Messages Area with Enhanced Background - Mobile Padding */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 relative" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* Additional backdrop for better readability */}
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm -z-10"></div>
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex gap-2 sm:gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                        <FaRobot className="text-white text-xs" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                    <div className={`${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white ml-auto shadow-lg backdrop-blur-sm' 
                        : 'bg-slate-800/90 text-slate-100 border border-slate-700/60 shadow-lg backdrop-blur-sm'
                    } rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200`}>
                      <div className="text-xs sm:text-sm leading-relaxed">
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                        ))}
                      </div>
                      
                      {/* Minimal timestamp */}
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-200' : 'text-slate-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  
                  {/* GitHub Copilot-style options - Mobile Optimized */}
                  {message.options && message.options.length > 0 && (
                    <div className="mt-3 sm:mt-4 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (currentStep === 'welcome') handleOptionClick(option);
                            else if (currentStep === 'service') handleServiceClick(option);
                            else if (currentStep === 'timeline') handleTimelineClick(option);
                            else if (currentStep === 'status') handleStatusClick(option);
                            else if (currentStep === 'confirmation') handleFinalAction(option.value);
                          }}
                          className="w-full text-left p-2.5 sm:p-3 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/60 rounded-lg 
                                   transition-all duration-200 hover:border-blue-500/50 group text-xs sm:text-sm backdrop-blur-sm shadow-lg"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex-shrink-0">
                              {option.icon && <option.icon className="text-slate-400 group-hover:text-blue-400 text-xs sm:text-sm" />}
                            </div>
                            <div className="flex-1">
                              <div className="text-slate-200 font-medium group-hover:text-blue-400 transition-colors text-xs sm:text-sm">
                                {option.text}
                              </div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <FaChevronRight className="text-slate-400 text-xs" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-700 rounded-lg flex items-center justify-center">
                      <FaUser className="text-slate-300 text-xs" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Minimal typing indicator - Mobile Optimized */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2 sm:gap-3 justify-start"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaRobot className="text-white text-xs" />
              </div>
              <div className="bg-slate-800/90 border border-slate-700/60 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm shadow-lg">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Scroll anchor for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* GitHub Copilot Minimal Input Area - Mobile Optimized - Fixed at bottom */}
        {(currentStep === 'idea' || currentStep === 'contact') && (
          <div className="border-t border-slate-700/60 bg-slate-900/95 backdrop-blur-xl p-3 sm:p-6 shadow-xl flex-shrink-0 safe-bottom">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                    onFocus={() => {
                      // Scroll to bottom when input is focused (mobile keyboard opens)
                      setTimeout(() => scrollToBottom(), 300);
                    }}
                    placeholder={
                      currentStep === 'idea' 
                        ? "Share your project details..." 
                        : "Name, Email, Phone"
                    }
                    className="w-full bg-slate-800/90 border border-slate-700/60 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-slate-100 placeholder-slate-400 text-xs sm:text-sm focus:outline-none transition-all duration-200 backdrop-blur-sm shadow-lg"
                    disabled={isLoading}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </div>
                <motion.button
                  onClick={handleTextSubmit}
                  disabled={!inputValue.trim() || isLoading}
                  className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white p-2.5 sm:p-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FaSpinner className="text-sm" />
                    </motion.div>
                  ) : (
                    <FaPaperPlane className="text-sm" />
                  )}
                </motion.button>
              </div>
              <p className="text-xs text-slate-400 mt-2 sm:mt-3 text-center hidden sm:block">
                Your information is secure and will only be used to contact you about your project.
              </p>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default StudioChatbot;
