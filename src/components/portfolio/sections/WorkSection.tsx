import { useMemo } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Tile } from "../Tile";
import { CyclingText } from "../CyclingText";
import { AstrosisBg } from "../AstrosisBg";
import { TechStackBar } from "../TechStackBar";
import { astrosisCycle, smallProjects } from "@/lib/portfolio-data";
import { pack, COL_M, ROW_M, COL_D, ROW_D, type Size } from "@/lib/grid-pack";

const WORK_VARIANTS: Record<string, Size[]> = {
  astrosis: [
    { w: 2, h: 2 },
    { w: 3, h: 2 },
    { w: 2, h: 3 },
  ],
  p_cjit: [
    { w: 1, h: 1 },
    { w: 2, h: 1 },
    { w: 1, h: 2 },
  ],
  p_quip: [
    { w: 1, h: 1 },
    { w: 2, h: 1 },
    { w: 1, h: 2 },
  ],
  p_cufloda: [
    { w: 2, h: 1 },
    { w: 1, h: 1 },
    { w: 2, h: 2 },
  ],
};
const WORK_ORDER = ["astrosis", "p_cjit", "p_quip", "p_cufloda"];

export function WorkSection({
  seed,
  onOpenAstrosis,
  onOpenProjects,
}: {
  seed: number;
  onOpenAstrosis: () => void;
  onOpenProjects: () => void;
}) {
  const desktop = useMemo(() => pack(4, WORK_ORDER, seed, WORK_VARIANTS), [seed]);
  const mobile = useMemo(() => pack(2, WORK_ORDER, seed + 1, WORK_VARIANTS), [seed]);
  const dMap = Object.fromEntries(desktop.map((p) => [p.key, p]));
  const mMap = Object.fromEntries(mobile.map((p) => [p.key, p]));
  const cls = (k: string) => {
    const d = dMap[k];
    const m = mMap[k];
    return `${COL_M[m.w]} ${ROW_M[m.h]} ${COL_D[d.w]} ${ROW_D[d.h]}`;
  };

  return (
    <section className="mt-2">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3">
        Work
      </div>
      <LayoutGroup id="work">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px] grid-flow-dense"
          style={{ perspective: 1400 }}
        >
          <motion.div
            layout
            key={`${seed}-astrosis`}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className={cls("astrosis")}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Tile
              id="astrosis"
              label="Astrosis · Featured"
              onClick={onOpenAstrosis}
              className="h-full"
              bg="bg-tile"
            >
              <AstrosisBg />
              <div className="relative z-10 flex flex-col h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                  Featured
                </div>
                <div className="mt-auto pb-6">
                  <CyclingText
                    items={astrosisCycle}
                    className="text-xl md:text-2xl font-semibold leading-snug max-w-md"
                  />
                </div>
              </div>
            </Tile>
          </motion.div>

          {smallProjects.map((p) => {
            const key = `p_${p.key}`;
            return (
              <motion.div
                layout
                key={`${seed}-${key}`}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className={cls(key)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Tile
                  label={p.name}
                  onClick={onOpenProjects}
                  className="h-full"
                  bg={p.accent}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Project
                  </div>
                  <div className="mt-auto pb-6">
                    <div className="text-xl md:text-2xl font-semibold">{p.name}</div>
                    <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-amber mt-1">
                      {p.tags.join(" · ")}
                    </div>
                  </div>
                </Tile>
              </motion.div>
            );
          })}
        </div>
      </LayoutGroup>

      <div className="mt-2 md:mt-3">
        <TechStackBar />
      </div>
    </section>
  );
}
