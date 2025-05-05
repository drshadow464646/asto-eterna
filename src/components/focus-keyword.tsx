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
import { cn } from "@/lib/utils"; // Import cn

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
    // Simple random initial position for floating effect remains
    setPosition({
      x: (Math.random() - 0.5) * 10, // Adjust range as needed
      y: (Math.random() - 0.5) * 10,
    });
  }, []);

  if (!isClient) {
    // Render null or a placeholder on the server
    return null;
  }

  // Animation style applied to the trigger element
  const animationStyle = {
     transform: `translate(${position.x}px, ${position.y}px)`,
     animation: `float ${6 + Math.random() * 4}s ease-in-out infinite alternate`,
     animationDelay: `${index * 0.2}s`, // Stagger animation
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {/* Replaced Button with a span, styled as text */}
          <span
            className={cn(
              "text-lg md:text-xl font-semibold px-4 py-2 rounded-md", // Basic padding and rounded corners
              "text-primary cursor-pointer", // Text color and pointer cursor
              "hover:text-glow-violet hover:bg-primary/5 transition-colors duration-300 ease-out", // Hover effect
              "inline-block" // Ensure transform applies correctly
            )}
            style={animationStyle}
          >
            {name}
          </span>
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
