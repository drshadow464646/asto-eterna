"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FocusKeywordProps {
  name: string;
  description?: string; // Keep description prop for potential future use, but it's not used now
  index: number;
}

export function FocusKeyword({ name, index }: FocusKeywordProps) {
  const [isClient, setIsClient] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [animationDuration, setAnimationDuration] = React.useState(10); // Default duration

  React.useEffect(() => {
    setIsClient(true);
    // Set random values only on the client to prevent hydration mismatch
    setPosition({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
    });
    setAnimationDuration(6 + Math.random() * 4);
  }, []);

  if (!isClient) {
    // Render null on the server and initial client render to avoid mismatch
    return null;
  }

  // Animation style applied to the trigger element
  const animationStyle = {
     transform: `translate(${position.x}px, ${position.y}px)`,
     animation: `float ${animationDuration}s ease-in-out infinite alternate`,
     animationDelay: `${index * 0.2}s`, // Stagger animation
  };

  return (
    <>
      {/* Updated styling: removed cursor pointer; kept text styling and hover glow */}
      <span
        className={cn(
          "text-lg md:text-xl font-semibold", // Base font size and weight
          "text-primary", // Text color
          "hover:text-glow-violet transition-colors duration-300 ease-out", // Hover text glow effect
          "inline-block" // Ensure transform applies correctly
        )}
        style={animationStyle}
        suppressHydrationWarning // Added to suppress minor style mismatches from animation
      >
        {name}
      </span>
       {/* Keyframes defined directly in the component */}
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
