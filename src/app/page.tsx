
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { WorkSection } from '@/components/sections/work-section';
import { FocusAreasSection } from '@/components/sections/focus-areas-section';
import { ConnectSection } from '@/components/sections/connect-section';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen overflow-x-hidden">
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <FocusAreasSection />
      <ConnectSection />
    </main>
  );
}
