"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FocusKeywordProps {
  name: string;
  description: string;
  index: number;
}

export function FocusKeyword({ name, description, index }: FocusKeywordProps) {
  const [isClient, setIsClient] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    setIsClient(true);
    // Simple random initial position for floating effect
    setPosition({
      x: (Math.random() - 0.5) * 10, // Adjust range as needed
      y: (Math.random() - 0.5) * 10,
    });
  }, []);

  if (!isClient) {
    // Render null or a placeholder on the server
    return null;
  }

  // Simple animation style - replace with Framer Motion or GSAP for better effects
  const animationStyle = {
     transform: `translate(${position.x}px, ${position.y}px)`,
     animation: `float ${6 + Math.random() * 4}s ease-in-out infinite alternate`,
     animationDelay: `${index * 0.2}s`, // Stagger animation
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg md:text-xl font-semibold px-6 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 hover:text-glow-violet transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            style={animationStyle}
          >
            {name}
          </Button>
        </DialogTrigger>
        <DialogContent className="card-glass sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-glow-violet">{name}</DialogTitle>
            <DialogDescription className="text-foreground/80 pt-2">
              {description}
            </DialogDescription>
          </DialogHeader>
          {/* Optional: Add more content to the modal */}
        </DialogContent>
      </Dialog>
       <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-8px) translateX(3px) rotate(2deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
        }
      `}</style>
    </>
  );
}
