import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Users, Code, Gamepad, Puzzle, Flame } from "lucide-react"; // Import relevant icons

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  // imageUrl and imageHint removed
  projectType?: "social" | "coding" | "rpg" | "platformer" | "burner"; // Optional type to determine icon
}

export function ProjectCard({ title, description, status, projectType }: ProjectCardProps) {
  const renderIcon = () => {
    switch (projectType) {
      case "social":
        return <Users className="w-12 h-12 text-primary/60" />;
      case "coding":
        return <Code className="w-12 h-12 text-primary/60" />;
      case "rpg":
        return <Gamepad className="w-12 h-12 text-primary/60" />;
      case "platformer":
        return <Puzzle className="w-12 h-12 text-primary/60" />;
      case "burner":
        return <Flame className="w-12 h-12 text-primary/60" />;
      default:
        return <Code className="w-12 h-12 text-primary/60" />; // Default icon
    }
  };

  return (
    <div className="group relative card-glass p-6 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 flex flex-col">
       {/* Placeholder UI Area */}
       <div className="relative flex items-center justify-center h-40 mb-4 rounded-md border border-white/10 bg-card/30 overflow-hidden">
         {renderIcon()}
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-50"></div>
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

      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-glow-violet group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-foreground/70 text-sm">{description}</p>
      </div>

      {/* Neon edge accent */}
      <div className="absolute inset-0 border border-transparent rounded-xl group-hover:border-primary/50 transition-all duration-300 pointer-events-none group-hover:shadow-[0_0_15px_rgba(115,88,255,0.4)]"></div>
       {/* Subtle grain texture */}
       <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none"></div>
    </div>
  );
}
