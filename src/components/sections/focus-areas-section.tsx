'use client';

import { SectionTitle } from "@/components/section-title";
import { FocusKeyword } from "@/components/focus-keyword";

const keywords = [
  { name: "AI", description: "Exploring generative models and creative AI tools." },
  { name: "Game Dev", description: "Building immersive worlds and unique gameplay mechanics." },
  { name: "Web Tech", description: "Crafting interactive and performant web experiences." },
  { name: "Creative Coding", description: "Blending art and technology through code." },
  { name: "Design Systems", description: "Creating scalable and consistent UI libraries." },
];

export function FocusAreasSection() {
  return (
    <section id="focus" className="py-20 md:py-32 w-full max-w-4xl mx-auto px-4 text-center overflow-hidden">
      <SectionTitle title="Focus Areas" glowColor="violet" />
      <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-12 relative">
        {/* Placeholder for potential orbit/animation container */}
        {keywords.map((keyword, index) => (
          <FocusKeyword key={keyword.name} {...keyword} index={index} />
        ))}
         {/* Simple decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-dashed border-primary/10 rounded-full -z-10 animate-spin-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-secondary/5 rounded-full filter blur-lg animate-pulse -z-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-primary/5 rounded-full filter blur-lg animate-pulse delay-500 -z-10"></div>
      </div>
       <style jsx>{`
         @keyframes spin-slow {
           from { transform: translate(-50%, -50%) rotate(0deg); }
           to { transform: translate(-50%, -50%) rotate(360deg); }
         }
         .animate-spin-slow { animation: spin-slow 40s linear infinite; }
       `}</style>
    </section>
  );
}
