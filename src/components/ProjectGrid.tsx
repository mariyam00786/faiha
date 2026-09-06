import Link from "next/link";
import { siteData } from "@/data/site";

export function ProjectGrid() {
  return (
    <>
      <section className="projectsHeader">
        <h3>Selected Works</h3>
      </section>

      <section id="projects" className="siteContainer projectGrid">
        {siteData.projects.map((project) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="gridProject"
          >
            <img
              src={project.heroImage}
              alt={project.title}
              loading="lazy"
            />
            <div className="projectOverlay">
              <h2>{project.title}</h2>
              <p>{project.category}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
