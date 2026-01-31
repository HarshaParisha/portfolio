# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context
This is a modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. The project follows modern React patterns and includes:

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Animations**: Framer Motion for smooth animations
- **Icons**: React Icons for consistent iconography
- **Forms**: EmailJS for contact form functionality
- **Features**: Dark mode toggle, responsive design, SEO optimization

## Code Style & Patterns
- Use functional components with React hooks
- Implement TypeScript interfaces for all props and data structures
- Follow mobile-first responsive design principles
- Use Tailwind CSS classes for styling
- Implement proper semantic HTML structure
- Use Next.js Image component for optimized images
- Follow accessibility best practices (ARIA labels, keyboard navigation)

## File Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
- `/public` - Static assets (images, icons)
- `/data` - Static data files (projects, skills, etc.)
- `/types` - TypeScript type definitions

## Portfolio Sections
The website includes these main sections:
1. **Hero Section** - Dynamic introduction with animated text
2. **About Me** - Personal story and background
3. **Skills** - Technical capabilities organized by categories
4. **Projects** - Portfolio showcase with hover effects and metrics
5. **Experience** - Professional timeline
6. **Contact** - Contact form with social links

## Performance & SEO
- Optimize images using Next.js Image component
- Implement proper meta tags and OpenGraph data
- Use semantic HTML for better SEO
- Implement lazy loading for below-the-fold content
- Optimize bundle size with dynamic imports
