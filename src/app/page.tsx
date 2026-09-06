import { FloatingNav } from "@/components/FloatingNav";
import { HomeIntro } from "@/components/HomeIntro";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SelectedMoments } from "@/components/SelectedMoments";
import { AboutSection } from "@/components/AboutSection";
import { ToolsCanvas } from "@/components/ToolsCanvas";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <FloatingNav />
      <HomeIntro />
      <ProjectGrid />
      <SelectedMoments />
      <AboutSection />
      <ToolsCanvas />
      <Footer />
    </main>
  );
}
