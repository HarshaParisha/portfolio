import SideNavigation from '@/components/SideNavigation';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <SideNavigation />
      <main className="ml-20">
        <section id="home">
          <HeroSection />
        </section>
      </main>
    </div>
  );
}
