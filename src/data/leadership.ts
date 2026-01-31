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

export const leadershipData: LeadershipExperience[] = [
  {
    id: 'ai-intent-building-2025',
    year: '2025',
    title: 'Building AI with Intent',
    organization: 'Personal Project',
    organizationUrl: 'https://github.com/HarshaParisha',
    duration: '2025',
    achievements: [
      'Developed a production-ready NLP chatbot capable of understanding user intent and responding contextually',
      'Used Python, Flask, TensorFlow, and NLTK to design a full NLP pipeline and trained a custom intent classifier',
      'Integrated the chatbot into applications through REST APIs and optimized using F1 score evaluation',
      'Shortlisted for the Google Career Launchpad in 2025, recognized among the top AI students in India'
    ]
  },
  {
    id: 'onestop-ai-2024',
    year: '2024',
    title: 'Building OneStop AI',
    organization: 'OneStop AI',
    organizationUrl: 'https://onestopai.lovable.app/',
    duration: '2024',
    achievements: [
      'Founded and led the development of OneStop AI — a full-stack platform that aggregates over 100 AI tools',
      'Implemented real-time integrations using React, Firebase, and OpenAI APIs with seamless user experience',
      'Used analytics-driven feedback to improve retention by 30 percent through iterative product development',
      'Built Real-Time Collaboration Analytics Dashboard using React.js, Node.js, MongoDB, and Socket.io',
      'Certified in Prompt Engineering and Applied AI through hands-on masterclass in 2024'
    ]
  },
  {
    id: 'dual-internships-2023',
    year: '2023',
    title: 'Designing for Impact',
    organization: 'Next24Tech & Bharat Intern',
    organizationUrl: 'https://www.linkedin.com/company/next24tech-technology-services',
    duration: '2023',
    achievements: [
      'Product Design Intern at Next24Tech: Crafted user-centric interfaces and responsive SaaS UI/UX systems using Figma',
      'Led user testing sessions and designed full design systems for internal tools',
      'Software Development Intern at Bharat Intern: Built modular REST APIs and handled backend logic',
      'Followed proper Git workflows in team-based Agile setting with focus on collaborative development',
      'Completed Cisco\'s Introduction to Cybersecurity program and led community AI project reaching 1,000+ users'
    ]
  },
  {
    id: 'ai-learning-journey-2022',
    year: '2022',
    title: 'Learning AI, One Build at a Time',
    organization: 'Anurag University',
    organizationUrl: 'https://anurag.edu.in',
    duration: '2022 – Present',
    achievements: [
      'Began B.Tech in Artificial Intelligence and Machine Learning, turning curiosity into experimentation',
      'Moved from foundational concepts to real-world projects with creation and application mindset'
    ]
  },
  {
    id: 'esports-foundation-2021',
    year: '2021',
    title: 'The Spark Begins',
    organization: 'Competitive Esports',
    organizationUrl: 'https://theesports.club/',
    duration: '2021',
    achievements: [
      'Immersed in competitive esports before writing first line of code, learning strategy and teamwork',
      'Developed understanding of digital communities and what makes them thrive',
      'Mastered quick decision-making and intensity of strategic thinking',
      'Built foundation for understanding how digital platforms and user engagement work'
    ]
  }
];
