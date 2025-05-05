'use client';

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from 'next/link';

export function HeroSection() {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center min-h-screen w-full text-center px-4 relative overflow-hidden"
    >
      {/* Placeholder for potential animated background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-indigo-950/30 to-black">
         {/* Simple particle-like effect using radial gradients */}
         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
         <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-purple-600/10 rounded-full filter blur-2xl animate-pulse delay-500"></div>
      </div>

      <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-widest uppercase mb-4 text-glow-violet animate-fade-in-slow">
        ASTO VOLT
      </h1>
      <p className="text-xl md:text-2xl text-secondary mb-6 text-glow-blue animate-fade-in delay-500">
        Ctrl + Alt + Glow Up.
      </p>
      <p className="text-lg md:text-xl text-foreground/80 mb-10 animate-fade-in delay-1000">
        Hi, I’m Suhani — I build ideas into reality.
      </p>
      <Link href="#about" passHref>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full px-8 py-6 text-lg border-primary text-primary hover:bg-primary/10 hover:text-primary button-glow-violet animate-bounce-slow delay-1500"
          aria-label="Scroll down to About section"
        >
          Explore <ArrowDown className="ml-2 h-5 w-5" />
        </Button>
      </Link>
       <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-slow {
           from { opacity: 0; transform: translateY(20px); }
           to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-slow { animation: fade-in-slow 1s ease-out forwards; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
        .delay-1000 { animation-delay: 1s; opacity: 0; }
        .delay-1500 { animation-delay: 1.5s; opacity: 0; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
      `}</style>
    </section>
  );
}
