import { createServerFn } from "@tanstack/react-start";

type Track = {
  id: number;
  title: string;
  artist: string;
  previewUrl: string;
  artworkUrl: string;
};

let cache: { at: number; data: Track[] } | null = null;
const TTL_MS = 60 * 60 * 1000;

export const getKanyeTracks = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ items: Track[]; error: string | null }> => {
    const now = Date.now();
    if (cache && now - cache.at < TTL_MS) {
      return { items: cache.data, error: null };
    }
    try {
      const res = await fetch(
        "https://itunes.apple.com/search?term=kanye+west&entity=song&limit=50",
      );
      if (!res.ok) return { items: [], error: `HTTP ${res.status}` };
      const json = (await res.json()) as {
        results: Array<{
          trackId: number;
          trackName: string;
          artistName: string;
          previewUrl?: string;
          artworkUrl100?: string;
        }>;
      };
      const items: Track[] = json.results
        .filter((r) => r.previewUrl)
        .map((r) => ({
          id: r.trackId,
          title: r.trackName,
          artist: r.artistName,
          previewUrl: r.previewUrl!,
          artworkUrl: (r.artworkUrl100 ?? "").replace("100x100", "300x300"),
        }));
      // shuffle
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      cache = { at: now, data: items };
      return { items, error: null };
    } catch (e) {
      return { items: [], error: e instanceof Error ? e.message : "fetch failed" };
    }
  },
);
