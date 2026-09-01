import { FloatingNav } from "@/components/FloatingNav";
import { Hero } from "@/components/Hero";
import { ProfileIntro } from "@/components/ProfileIntro";
import { TableOfContents } from "@/components/TableOfContents";
import { ContentSections } from "@/components/ContentSections";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SelectedMoments } from "@/components/SelectedMoments";
import { AboutSection } from "@/components/AboutSection";
import { ToolsCanvas } from "@/components/ToolsCanvas";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <FloatingNav />
      <Hero />
      <ProfileIntro />
      <TableOfContents />
      <ContentSections />
      <ProjectGrid />
      <SelectedMoments />
      <AboutSection />
      <ToolsCanvas />
      <Footer />
    </main>
  );
}
