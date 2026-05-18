import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Github, ExternalLink } from "lucide-react";
import { getGithubContributions } from "@/lib/github-stats.functions";
import { links } from "@/lib/portfolio-data";

const LEVEL_BG = [
  "bg-[oklch(0.25_0_0)]",
  "bg-[oklch(0.45_0.10_75)]",
  "bg-[oklch(0.60_0.13_75)]",
  "bg-[oklch(0.72_0.15_75)]",
  "bg-[oklch(0.82_0.17_75)]",
];

export function GithubStatsTile() {
  const fn = useServerFn(getGithubContributions);
  const { data } = useQuery({
    queryKey: ["gh", links.githubUser],
    queryFn: () => fn({ data: { user: links.githubUser } }),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Group last 35 days into 5 columns × 7 days
  const days = data?.days ?? [];
  const cols: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) cols.push(days.slice(i, i + 7));

  return (
    <a
      href={links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group bg-tile border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden"
    >
      <div className="flex items-center gap-2">
        <Github className="w-4 h-4 text-amber" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          GitHub
        </span>
        <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-semibold text-amber tabular-nums">
          {data?.total ?? "—"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          last year
        </span>
      </div>
      <div className="mt-3 flex gap-[3px]">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {col.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.count}`}
                className={`w-2.5 h-2.5 ${LEVEL_BG[d.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground group-hover:text-amber transition-colors">
        Contributions
      </div>
    </a>
  );
}
