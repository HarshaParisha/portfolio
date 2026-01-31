import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Tech Solutions Inc.',
    position: 'Senior Frontend Developer',
    duration: '2023 - Present',
    current: true,
    description: [
      'Lead frontend development for multiple client projects using React and Next.js',
      'Mentored junior developers and conducted code reviews',
      'Implemented responsive designs and improved application performance by 40%',
      'Collaborated with design and backend teams to deliver high-quality solutions'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL']
  },
  {
    id: '2',
    company: 'Digital Agency Pro',
    position: 'Frontend Developer',
    duration: '2022 - 2023',
    description: [
      'Developed custom websites and web applications for various clients',
      'Converted Figma designs to pixel-perfect responsive web interfaces',
      'Optimized website performance and implemented SEO best practices',
      'Worked closely with clients to understand requirements and deliver solutions'
    ],
    technologies: ['React', 'JavaScript', 'SCSS', 'WordPress', 'PHP']
  },
  {
    id: '3',
    company: 'StartUp Innovations',
    position: 'Junior Frontend Developer',
    duration: '2021 - 2022',
    description: [
      'Built user interfaces for web applications using React and Redux',
      'Integrated REST APIs and implemented state management solutions',
      'Participated in agile development processes and daily standups',
      'Learned modern development practices and contributed to team projects'
    ],
    technologies: ['React', 'Redux', 'JavaScript', 'CSS3', 'REST APIs']
  }
];
