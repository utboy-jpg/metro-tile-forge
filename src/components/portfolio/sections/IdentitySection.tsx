import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Tile } from "../Tile";
import { links } from "@/lib/portfolio-data";

const tags = ["GPU", "CUDA", "C++", "SYSTEMS"];

export function IdentitySection() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-2 row-span-2 md:col-span-3 md:row-span-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Tile id="identity" label="Utkarsh Joshi" className="h-full" bg="bg-tile">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
            Systems &amp; Simulation Engineer
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            Utkarsh Joshi
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl">
            Cool technical projects. Fast code. GPU curiosity. C, C++, CUDA, simulation,
            systems, and whatever looks hard enough to be fun.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-border text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </Tile>
      </motion.div>

      <ContactTile
        href={links.linkedin}
        Icon={Linkedin}
        label="LinkedIn"
        sub="profile"
        delay={0.05}
      />
      <ContactTile
        href={`mailto:${links.email}`}
        Icon={Mail}
        label="Email"
        sub="say hi"
        delay={0.1}
        external={false}
      />
      <ContactTile
        href={links.resume}
        Icon={FileText}
        label="Resume"
        sub="resume.pdf"
        delay={0.15}
        accent
      />
      <ContactTile
        href={links.github}
        Icon={Github}
        label="GitHub"
        sub={links.githubUser}
        delay={0.2}
      />
    </section>
  );
}

function ContactTile({
  href,
  Icon,
  label,
  sub,
  delay,
  accent,
  external = true,
}: {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  delay: number;
  accent?: boolean;
  external?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="col-span-1 row-span-1"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Tile
        label={label}
        href={href}
        external={external}
        className={`h-full ${accent ? "border-b-2 border-b-amber" : ""}`}
        bg={accent ? "bg-tile-alt" : "bg-tile"}
      >
        <Icon className="w-5 h-5 text-amber" />
        <div className="mt-auto pb-6 font-mono text-xs break-all">{sub}</div>
      </Tile>
    </motion.div>
  );
}
