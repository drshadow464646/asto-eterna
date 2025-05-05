import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";

const projects = [
  {
    title: "BondUp",
    description: "Connecting people through shared interests.",
    status: "Coming Soon",
    // imageUrl removed
    // imageHint removed
    projectType: "social",
  },
  {
    title: "LinguaCode",
    description: "Learn coding concepts through language.",
    status: "Coming Soon",
    // imageUrl removed
    // imageHint removed
    projectType: "coding",
  },
  {
    title: "Unnamed RPG",
    description: "A narrative-driven adventure game.",
    status: "In Development",
    // imageUrl removed
    // imageHint removed
    projectType: "rpg",
  },
  {
    title: "Platformer Prototype",
    description: "Exploring unique movement mechanics.",
    status: "Prototype",
    // imageUrl removed
    // imageHint removed
    projectType: "platformer",
  },
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
