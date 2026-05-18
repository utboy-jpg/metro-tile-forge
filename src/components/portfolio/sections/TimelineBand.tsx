import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { timeline } from "@/lib/portfolio-data";

export function TimelineBand() {
  return (
    <section className="my-8 md:my-10 px-1">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-4">
        Timeline
      </div>
      <ol className="flex flex-col items-start gap-2">
        {timeline.map((t, i) => (
          <motion.li
            key={t.year}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-baseline gap-3 font-mono text-sm md:text-base">
              <span className="text-amber tabular-nums">{t.year}</span>
              <span className="text-muted-foreground">— {t.text}</span>
            </div>
            {i < timeline.length - 1 && (
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="ml-3 text-muted-foreground/60"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.div>
            )}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
