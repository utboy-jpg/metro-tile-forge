import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trophy, ExternalLink } from "lucide-react";
import { getCodeforcesStats } from "@/lib/codeforces.functions";
import { links } from "@/lib/portfolio-data";

export function CodeforcesTile() {
  const fn = useServerFn(getCodeforcesStats);
  const { data } = useQuery({
    queryKey: ["cf", links.codeforcesHandle],
    queryFn: () => fn({ data: { handle: links.codeforcesHandle } }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <a
      href={links.codeforces}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group bg-tile-alt border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden"
    >
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          Codeforces
        </span>
        <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-3 font-mono text-sm text-foreground break-all">
        @{links.codeforcesHandle}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-semibold text-amber tabular-nums">
          {data?.rating ?? "—"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          rating
        </span>
      </div>
      <div className="mt-2 font-mono text-[11px] text-muted-foreground">
        max {data?.maxRating ?? "—"} · {data?.rank ?? "unrated"}
      </div>
      <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground group-hover:text-amber transition-colors">
        Contests
      </div>
    </a>
  );
}
