import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { getRandomArt } from "@/lib/gallery.functions";

export function GalleryTile({ onOpen }: { onOpen: () => void }) {
  const fn = useServerFn(getRandomArt);
  const { data } = useQuery({
    queryKey: ["art"],
    queryFn: () => fn(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const items = data?.items ?? [];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  const cur = items[i];

  return (
    <button
      onClick={onOpen}
      className="block w-full h-full relative overflow-hidden bg-tile border border-transparent hover:border-amber transition-colors group text-left"
    >
      <AnimatePresence mode="popLayout">
        {cur && (
          <motion.img
            key={cur.id}
            src={cur.imageUrl}
            alt={cur.title}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 8, ease: "linear" } }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {!cur && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <ImageIcon className="w-8 h-8" />
        </div>
      )}
      <div className="absolute top-4 left-4 z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
          Gallery
        </span>
      </div>
      <div className="absolute bottom-3 left-4 right-4 z-10">
        <div className="font-semibold text-white text-base md:text-lg truncate">
          {cur?.title ?? "Loading…"}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70 truncate">
          {cur?.artist ?? "Art Institute of Chicago"}
        </div>
      </div>
    </button>
  );
}
