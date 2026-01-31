import { Education } from '@/types';

export const educationData: Education[] = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science Engineering',
    institution: 'Anurag University',
    institutionShort: 'AU',
    duration: '2022 – Present',
    grade: '7.25 CGPA (Semester-7)',
    description: 'Exploring the depths of computer science through hands-on projects, from algorithms to system design.',
    logo: '/images/anurag-logo.jpg',
    color: 'from-blue-500 to-purple-600',
    link: 'https://anurag.edu.in/'
  },
  {
    id: 2,
    degree: 'Higher Secondary (XII, CBSE)',
    institution: 'Shree SwamiNarayan Gurukul : HYD',
    institutionShort: 'SSNG',
    duration: '2021',
    grade: '77.2%',
    description: 'Discovered a growing interest in technology and problem-solving.',
    logo: '/images/johnson-logo.jpg',
    color: 'from-pink-500 to-red-500',
    link: 'https://gurukul.org/'
  },
  {
    id: 3,
    degree: 'Secondary School (X, CBSE)',
    institution: 'Shree SwamiNarayan Gurukul : HYD',
    institutionShort: 'SSNG',
    duration: '2020',
    grade: '82.3%',
    description: 'Where it all began — a love for learning, logic, and curiosity about how things work.',
    logo: '/images/sarathi-logo.jpg',
    color: 'from-orange-500 to-yellow-500',
    link: 'https://gurukul.org/'
  }
];
