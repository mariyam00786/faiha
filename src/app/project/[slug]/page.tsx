import { siteData } from "@/data/site";
import { notFound } from "next/navigation";
import { FloatingNav } from "@/components/FloatingNav";
import { Footer } from "@/components/Footer";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return siteData.projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = siteData.projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f7f3]">
      <FloatingNav />
      <article className="pb-16">
        <ProjectDetailClient project={project as any} />
      </article>
      <Footer />
    </main>
  );
}
