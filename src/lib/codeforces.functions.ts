import { createServerFn } from "@tanstack/react-start";

type CFStats = {
  handle: string;
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  maxRank: string | null;
  error: string | null;
};

let cache: { at: number; data: CFStats } | null = null;
const MIN_INTERVAL_MS = 2000;

export const getCodeforcesStats = createServerFn({ method: "GET" })
  .inputValidator((input: { handle: string }) => input)
  .handler(async ({ data }): Promise<CFStats> => {
    const now = Date.now();
    if (cache && now - cache.at < MIN_INTERVAL_MS && cache.data.handle === data.handle) {
      return cache.data;
    }
    try {
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${encodeURIComponent(data.handle)}`,
      );
      if (!res.ok) {
        const fallback: CFStats = {
          handle: data.handle,
          rating: null,
          maxRating: null,
          rank: null,
          maxRank: null,
          error: `HTTP ${res.status}`,
        };
        cache = { at: now, data: fallback };
        return fallback;
      }
      const json = (await res.json()) as {
        status: string;
        result?: Array<{
          handle: string;
          rating?: number;
          maxRating?: number;
          rank?: string;
          maxRank?: string;
        }>;
      };
      const u = json.result?.[0];
      const out: CFStats = {
        handle: data.handle,
        rating: u?.rating ?? null,
        maxRating: u?.maxRating ?? null,
        rank: u?.rank ?? null,
        maxRank: u?.maxRank ?? null,
        error: null,
      };
      cache = { at: now, data: out };
      return out;
    } catch (e) {
      const fallback: CFStats = {
        handle: data.handle,
        rating: null,
        maxRating: null,
        rank: null,
        maxRank: null,
        error: e instanceof Error ? e.message : "fetch failed",
      };
      cache = { at: now, data: fallback };
      return fallback;
    }
  });
