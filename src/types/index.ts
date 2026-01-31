// Studio Chatbot Types
export interface StudioInquiry {
  name: string;
  email: string;
  whatsapp?: string;
  welcomeChoice: string;
  serviceType: string;
  projectDescription: string;
  timeline: string;
  projectStatus: string;
  contactInfo?: string;
}

export interface WhatsAppResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: Array<{ text: string; value: string; icon?: any }>;
  isTyping?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  featured: boolean;
  metrics?: {
    performance?: string;
    users?: string;
    improvement?: string;
  };
}

export interface Skill {
  category: string;
  items: {
    name: string;
    level: number;
    icon?: string;
  }[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  current?: boolean;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  institutionShort: string;
  duration: string;
  grade: string;
  description: string;
  logo: string;
  color: string;
  link?: string;
}

export interface LeadershipExperience {
  id: string;
  year: string;
  title: string;
  organization: string;
  organizationUrl: string;
  duration: string;
  achievements: string[];
  icon?: string;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
  icon: string;
  color: string;
  glowColor: string;
  url?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
