import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Play, Pause, SkipForward, SkipBack, Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getKanyeTracks } from "@/lib/music.functions";

export function MusicPlayer() {
  const fn = useServerFn(getKanyeTracks);
  const { data } = useQuery({
    queryKey: ["music-kanye"],
    queryFn: () => fn(),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const tracks = data?.items ?? [];

  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = tracks[idx];

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    el.src = current.previewUrl;
    if (playing) el.play().catch(() => setPlaying(false));
  }, [idx, current?.previewUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [playing]);

  const next = () => setIdx((i) => (tracks.length ? (i + 1) % tracks.length : 0));
  const prev = () =>
    setIdx((i) => (tracks.length ? (i - 1 + tracks.length) % tracks.length : 0));

  return (
    <div className="h-full bg-tile-purple border border-transparent hover:border-amber transition-colors p-5 relative overflow-hidden flex flex-col">
      <div className="flex items-center gap-2">
        <Music className="w-4 h-4 text-amber" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          Music · 30s clips
        </span>
      </div>
      <div className="mt-3 min-h-0 flex-1">
        <div className="font-mono text-sm font-semibold truncate">
          {current?.title ?? "Loading…"}
        </div>
        <div className="font-mono text-[11px] text-muted-foreground truncate">
          {current?.artist ?? "Kanye West"}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={prev}
          aria-label="Previous"
          className="w-9 h-9 border border-border flex items-center justify-center hover:border-amber hover:text-amber transition-colors"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="w-10 h-10 border border-amber text-amber flex items-center justify-center hover:bg-amber hover:text-background transition-colors"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="w-9 h-9 border border-border flex items-center justify-center hover:border-amber hover:text-amber transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
      <audio
        ref={audioRef}
        onEnded={next}
        preload="none"
      />
      <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
        {tracks.length ? `${idx + 1}/${tracks.length}` : "—"}
      </div>
    </div>
  );
}
