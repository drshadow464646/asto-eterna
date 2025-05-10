import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";

const projects = [
  {
    title: "LoopIn",
    description: "Keep track of your interactions and manage connections.", // Updated description
    status: "Coming Soon",
    projectType: "social",
  },
  {
    title: "LinguaCode",
    description: "Making it easier to switch between languages.", // Updated description
    status: "Coming Soon",
    projectType: "coding",
  },
  // Removed "Unnamed RPG" and "Platformer Prototype"
];

export function WorkSection() {
  return (
    <section id="work" className="py-20 md:py-32 w-full max-w-6xl mx-auto px-4">
      {/* Updated section title */}
      <SectionTitle title="My Growth" glowColor="blue" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
