import { createServerFn } from "@tanstack/react-start";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type GHStats = {
  user: string;
  total: number;
  days: Day[]; // last ~35 days
  error: string | null;
};

export const getGithubContributions = createServerFn({ method: "GET" })
  .inputValidator((input: { user: string }) => input)
  .handler(async ({ data }): Promise<GHStats> => {
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(data.user)}?y=last`,
      );
      if (!res.ok) {
        return { user: data.user, total: 0, days: [], error: `HTTP ${res.status}` };
      }
      const json = (await res.json()) as {
        total: Record<string, number>;
        contributions: Day[];
      };
      const days = json.contributions.slice(-35);
      const total = Object.values(json.total).reduce((a, b) => a + b, 0);
      return { user: data.user, total, days, error: null };
    } catch (e) {
      return {
        user: data.user,
        total: 0,
        days: [],
        error: e instanceof Error ? e.message : "fetch failed",
      };
    }
  });
