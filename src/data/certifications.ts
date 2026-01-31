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

export const certificationsData: Certification[] = [
  {
    id: 'google-ai-ml-internship',
    title: 'Google AI-ML Internship',
    organization: 'Google',
    year: '2024',
    icon: 'google',
    color: 'text-blue-400',
    glowColor: 'shadow-blue-500/20',
    url: 'https://drive.google.com/file/d/1SLQD9qTORfounGmNYOr5aAVzZRiWJPZK/view?usp=sharing'
  },
  {
    id: 'linkedin-project-management',
    title: 'Project Management Foundations',
    organization: 'LinkedIn',
    year: '2025',
    icon: 'linkedin',
    color: 'text-blue-500',
    glowColor: 'shadow-blue-500/20',
    url: 'https://drive.google.com/file/d/1-Fk86Q_jB1u8OaIlm6bEMNNr-N-HheHr/view?usp=sharing'
  },
  {
    id: 'microsoft-ai-odyssey',
    title: 'Microsoft AI Odyssey',
    organization: 'Microsoft',
    year: '2023',
    icon: 'microsoft',
    color: 'text-blue-400',
    glowColor: 'shadow-blue-500/20',
    url: 'https://drive.google.com/drive/folders/1uIp4LmIo3zc8Kd7mGsNUn_cuAy3A02Xv?usp=sharing'
  }
];
