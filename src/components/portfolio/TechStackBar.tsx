import { motion } from "framer-motion";
import { techStack } from "@/lib/portfolio-data";

export function TechStackBar() {
  // Duplicate for seamless loop
  const items = [...techStack, ...techStack];
  return (
    <div className="relative overflow-hidden bg-tile-alt border border-transparent hover:border-amber transition-colors h-[72px] flex items-center group">
      <div className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-amber pointer-events-none z-10">
        Tech Stack
      </div>
      <motion.div
        className="flex gap-10 pl-6 pr-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="font-mono text-xl md:text-2xl font-semibold text-foreground"
          >
            <span className="text-amber mr-3">·</span>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
