import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  glowColor?: "violet" | "blue";
  className?: string;
}

export function SectionTitle({ title, glowColor, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-4xl md:text-5xl font-bold mb-4 md:mb-6",
        glowColor === "violet" && "text-glow-violet",
        glowColor === "blue" && "text-glow-blue",
        className
      )}
    >
      {title}
    </h2>
  );
}
