"use client";
import { useState, useEffect } from 'react';
import SideNavigation from '@/components/SideNavigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import LeadershipSection from '@/components/LeadershipSection';
import CertificationsSection from '@/components/CertificationsSection';
import ScrollingBannerSection from '@/components/ScrollingBannerSection';
import CreativeStories, { StockieSection, OneStopSection } from '@/components/CreativeStories';
import Footer from '@/components/Footer';
import IntroScreen from '@/components/IntroScreen';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true); // Start with true for intro
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if user came from internal navigation (like from OneStop page)
    const isInternalNavigation = sessionStorage.getItem('internalNavigation');
    
    if (isInternalNavigation) {
      // User navigated from another page within the site - skip intro
      setShowIntro(false);
      sessionStorage.removeItem('internalNavigation'); // Clean up
    }
    // If it's a fresh page load/reload, show intro (default true)
  }, []);

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return null;
  }
  return (
    <>
      {showIntro && <IntroScreen onFinish={handleIntroFinish} />}
      <div style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.8s' }}>
        <div className="min-h-screen bg-gray-900">
          <SideNavigation />
          {/* Mobile-first: no margin on mobile, margin-left on desktop */}
          <main className="ml-0 lg:ml-20">
            <section id="home">
              <HeroSection />
            </section>
            <AboutSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
            <LeadershipSection />
            <CertificationsSection />
            <ScrollingBannerSection />
            <CreativeStories />
            <StockieSection />
            <OneStopSection />
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
