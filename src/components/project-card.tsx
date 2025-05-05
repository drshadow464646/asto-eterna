import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  imageUrl: string;
  imageHint?: string; // Added for AI hint
}

export function ProjectCard({ title, description, status, imageUrl, imageHint }: ProjectCardProps) {
  return (
    <div className="group relative card-glass p-6 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
      <div className="relative aspect-video mb-4 rounded-md overflow-hidden border border-white/10">
        <Image
          src={imageUrl}
          alt={`${title} preview`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={imageHint} // Added AI hint attribute
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
         <Badge
          variant="secondary"
          className={cn(
            "absolute top-2 right-2 bg-secondary/80 text-secondary-foreground backdrop-blur-sm transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0",
             status === "Coming Soon" && "bg-primary/80 text-primary-foreground"
          )}
         >
           {status}
         </Badge>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-glow-violet group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>

      {/* Neon edge accent */}
      <div className="absolute inset-0 border border-transparent rounded-xl group-hover:border-primary/50 transition-all duration-300 pointer-events-none group-hover:shadow-[0_0_15px_rgba(115,88,255,0.4)]"></div>
       {/* Subtle grain texture */}
       <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none"></div>

    </div>
  );
}
