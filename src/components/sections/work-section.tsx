import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";

const projects = [
  {
    title: "Tether",
    description: "Keep track of your interactions and manage connections.",
    projectType: "social",
  },
  {
    title: "Tranzoid",
    description: "Making it easier to switch between languages.",
    projectType: "coding",
    url: "https://tranzoid.com",
  },
  {
    title: "Ashground",
    description: "A digital burner.",
    projectType: "burner",
    url: "https://ashground.com",
  },
  {
    title: "Drillzy",
    description: "Level up daily.",
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
