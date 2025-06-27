import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";

const projects = [
  {
    title: "Tether",
    description: "Keep track of your interactions and manage connections.",
    status: "Coming Soon",
    projectType: "social",
  },
  {
    title: "LinguaCode",
    description: "Making it easier to switch between languages.",
    status: "Coming Soon",
    projectType: "coding",
  },
  {
    title: "Ashground",
    description: "A digital burner.",
    status: "Coming Soon",
    projectType: "social",
  },
  {
    title: "Drillzy",
    description: "Level up daily.",
    status: "Coming Soon",
    projectType: "rpg",
  },
];

export function WorkSection() {
  return (
    <section id="work" className="py-20 md:py-32 w-full max-w-6xl mx-auto px-4">
      {/* Updated section title */}
      <SectionTitle title="Our Growth" glowColor="blue" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
