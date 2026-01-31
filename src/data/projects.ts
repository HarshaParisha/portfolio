import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with modern design and seamless user experience.',
    longDescription: 'Built a comprehensive e-commerce platform using Next.js, TypeScript, and Stripe for payments. Features include product catalog, shopping cart, user authentication, order management, and admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/HarshaParisha/ecommerce-platform',
    imageUrl: '/images/ecommerce-project.jpg',
    featured: true,
    metrics: {
      performance: '95+ Lighthouse Score',
      users: '1000+ Active Users',
      improvement: '40% Faster Load Time'
    }
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    longDescription: 'Developed a modern task management application with drag-and-drop functionality, real-time collaboration, and team management features. Built with React, Node.js, and Socket.io.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI', 'Express'],
    liveUrl: 'https://example-taskapp.com',
    githubUrl: 'https://github.com/HarshaParisha/task-management',
    imageUrl: '/images/task-app-project.jpg',
    featured: true,
    metrics: {
      performance: '98% Uptime',
      users: '500+ Teams',
      improvement: '60% Productivity Increase'
    }
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather application with location-based forecasts and beautiful visualizations.',
    longDescription: 'Created a weather dashboard that provides detailed weather information, forecasts, and interactive maps. Features location search, favorite locations, and weather alerts.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API', 'Geolocation API'],
    liveUrl: 'https://example-weather.com',
    githubUrl: 'https://github.com/HarshaParisha/weather-dashboard',
    imageUrl: '/images/weather-project.jpg',
    featured: false
  }
];

export const featuredProjects = projects.filter(project => project.featured);
