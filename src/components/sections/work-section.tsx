import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";

const projects = [
  {
    title: "BondUp",
    description: "Connecting people through shared interests.",
    status: "Coming Soon",
    imageUrl: "https://picsum.photos/seed/bond/400/300",
    imageHint: "connection network people",
  },
  {
    title: "LinguaCode",
    description: "Learn coding concepts through language.",
    status: "Coming Soon",
    imageUrl: "https://picsum.photos/seed/lingua/400/300",
    imageHint: "code language learn",
  },
  {
    title: "Unnamed RPG",
    description: "A narrative-driven adventure game.",
    status: "In Development",
    imageUrl: "https://picsum.photos/seed/rpg/400/300",
    imageHint: "fantasy game sword",
  },
  {
    title: "Platformer Prototype",
    description: "Exploring unique movement mechanics.",
    status: "Prototype",
    imageUrl: "https://picsum.photos/seed/plat/400/300",
    imageHint: "platformer game jump",
  },
];

export function WorkSection() {
  return (
    <section id="work" className="py-20 md:py-32 w-full max-w-6xl mx-auto px-4">
      <SectionTitle title="My Work" glowColor="blue" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
