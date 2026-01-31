import { Skill } from '@/types';

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript', level: 95 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'Framer Motion', level: 85 }
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 82 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 78 },
      { name: 'Prisma', level: 85 },
      { name: 'GraphQL', level: 75 }
    ]
  },
  {
    category: 'Tools & Technologies',
    items: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Vercel', level: 88 },
      { name: 'Figma', level: 85 },
      { name: 'VS Code', level: 95 }
    ]
  }
];
