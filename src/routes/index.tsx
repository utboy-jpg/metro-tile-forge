import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";
import { IdentitySection } from "@/components/portfolio/sections/IdentitySection";
import { TimelineBand } from "@/components/portfolio/sections/TimelineBand";
import { WorkSection } from "@/components/portfolio/sections/WorkSection";
import { BeyondSection } from "@/components/portfolio/sections/BeyondSection";
import { AstrosisPanel } from "@/components/portfolio/panels/AstrosisPanel";
import { ProjectsPanel } from "@/components/portfolio/panels/ProjectsPanel";
import { RoadmapPanel } from "@/components/portfolio/panels/RoadmapPanel";
import { GalleryPanel } from "@/components/portfolio/panels/GalleryPanel";

export const Route = createFileRoute("/")({ component: Index });

type PanelId = "astrosis" | "projects" | "roadmap" | "gallery" | null;

function Index() {
  const [panel, setPanel] = useState<PanelId>(null);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));
  const close = () => setPanel(null);
  const reshuffle = useCallback(
    () => setSeed(Math.floor(Math.random() * 1e9)),
    [],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 md:py-8">
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={reshuffle}
            className="inline-flex items-center gap-2 border border-border hover:border-amber hover:text-amber transition-colors px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em]"
            aria-label="Reshuffle tile layout"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Reshuffle
          </button>
        </div>

        <IdentitySection />
        <TimelineBand />
        <WorkSection
          seed={seed}
          onOpenAstrosis={() => setPanel("astrosis")}
          onOpenProjects={() => setPanel("projects")}
        />
        <BeyondSection
          seed={seed}
          onOpenGallery={() => setPanel("gallery")}
          onOpenRoadmap={() => setPanel("roadmap")}
        />
      </div>

      <AnimatePresence>
        {panel === "astrosis" && <AstrosisPanel key="astrosis" onClose={close} />}
        {panel === "projects" && <ProjectsPanel key="projects" onClose={close} />}
        {panel === "roadmap" && <RoadmapPanel key="roadmap" onClose={close} />}
        {panel === "gallery" && <GalleryPanel key="gallery" onClose={close} />}
      </AnimatePresence>
    </main>
  );
}
