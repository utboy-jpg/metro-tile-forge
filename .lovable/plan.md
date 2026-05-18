## Overview

Rebuild `src/routes/index.tsx` as three stacked sections instead of one flat mosaic. Identity stays fixed; Work and Beyond reshuffle within their own bounds (no cross-section gaps). All tiles get subtle motion on mount and hover.

## Section 1 — Identity (fixed, never reshuffles)

Desktop layout: 4-col grid, 2 rows tall.

```
┌────────────────────────────┬──────────┬──────────┐
│                            │ LinkedIn │  Email   │
│   Utkarsh Joshi (large)    ├──────────┼──────────┤
│   tagline, tags            │  Resume  │  GitHub  │
└────────────────────────────┴──────────┴──────────┘
```

- Hero plaque: name, "Systems & Simulation Engineer" label, one-liner, GPU/CUDA/C++/SYSTEMS chips. `col-span-3 row-span-2`.
- 4 contact tiles, each 1×1, stacked into the remaining column: LinkedIn, Email (mailto), Resume (PDF), GitHub. Icon + label only.
- Mobile: hero full-width 2×2, contacts as a 2×2 grid below.

## Section 2 — Timeline (written, no tiles)

A small written band between Identity and Work — no border, just text. Source data lives in `portfolio-data.ts` so future entries are one-line additions.

```
2025 — entered college
   ↓
2026 — contributing to open source
```

Rendered as a vertical list with a downward arrow glyph between rows, mono font, muted color. Subtle stagger fade-in on mount. No reshuffle.

## Section 3 — Work (reshuffles within section)

```
┌─────────────────────────┬─────────┬─────────┐
│                         │  cjit   │  Quip   │
│   Astrosis (featured)   ├─────────┴─────────┤
│                         │     CuFloda       │
├─────────────────────────┴───────────────────┤
│   Tech stack — spinning horizontal bar      │  (short height, full width)
└─────────────────────────────────────────────┘
```

- Astrosis: large featured tile (`col-span-2 row-span-2`), keeps animated SVG bg and panel.
- cjit, Quip, CuFloda: small project tiles. Each opens the existing `ProjectsPanel` scrolled to that project (or its own mini panel — using existing panel for now).
- Tech-stack bar: full-width tile, ~half the normal tile height (`row-span-1` but `h-[70px]`). Inside: `CyclingText` rotating through "C · C++ · CUDA · Python · OpenGL · NumPy · PyGame · POSIX · Bash" at ~1.6s interval, large mono amber text, marquee-like horizontal feel.
- Reshuffles Astrosis + 3 project tiles only. Tech bar stays pinned at the bottom of the section.

## Section 4 — Beyond (reshuffles within section)

```
┌──────────┬──────────┬──────────────────────┐
│ CF stats │  GH      │                      │
│ + rating │  contrib │   Gallery (large)    │
├──────────┴──────────┤                      │
│   Music player      │                      │
├─────────────────────┴──────────────────────┤
│   Roadmap                                  │
└────────────────────────────────────────────┘
```

- **Codeforces tile**: shows handle, current rating, max rating, rank. Fetched via `https://codeforces.com/api/user.info?handles=BakedRajma`. Cached server-side with a 2s minimum interval (rate-limit safe). Implementation: a `createServerFn` that holds a module-level `lastFetch` timestamp + cached result; if called within 2s of last fetch, returns cache. Client uses TanStack Query with `staleTime: 5 minutes`.
- **GitHub contributions tile**: shows total public contributions + a small inline 7×N heatmap. Fetched via GitHub's public contributions endpoint (`https://github-contributions-api.jogruber.de/v4/UtkarshJoshiNtl?y=last`) — no auth, no rate-limit issue. Same `createServerFn` + Query pattern. show the latest month.
- **Music tile**: ⏮ ⏯ ⏭ controls. Plays from a playlist of URLs you'll provide (placeholder: a free Jamendo/Pixabay popular-tracks endpoint, e.g. `https://api.jamendo.com/v3.0/tracks/?client_id=...&order=popularity_total&limit=20`). Uses an `<audio>` element with React state for current index. No autoplay (browser policy). Track title shown. play 30's clips of best parts of kanye songs.
- **Gallery tile**: large (`col-span-2 row-span-2`). Cycles through random art via the Art Institute of Chicago public API (`https://api.artic.edu/api/v1/artworks/search?q=painting&limit=20&fields=id,title,image_id`) — no key required. Click to open full-screen panel with arrow nav. Subtle Ken Burns zoom on the active image.
- **Roadmap tile**: keeps existing panel.

Reshuffles all 5 of these within the section bounds.

## Reshuffle behavior

- Reshuffle button reseeds Work + Beyond (Identity ignored).
- Each section calls `pack(cols, group, seed)` independently — never bleeds gaps between sections.
- Empty-cell rule from current `pack()` already absorbs leftover cells into the nearest tile, so each section stays gap-free.

## Animations (subtle, applied to every tile)

- Mount: `motion.div` with staggered fade-up (`opacity 0→1`, `y 8→0`, delay = index × 40ms).
- Reshuffle: existing `layout` spring (kept).
- Hover: existing 3D tilt (kept, slightly softened).
- Tech-stack `CyclingText`: faster interval (1.6s) for a "spinner" feel.
- Timeline: arrow glyph gently bobs (loop, 2s, ±2px).
- Gallery: active image scales 1.0→1.05 over 8s, swaps every 6s.

## New / changed files


| File                                                    | Change                                                  |
| ------------------------------------------------------- | ------------------------------------------------------- |
| `src/routes/index.tsx`                                  | Rewrite to 4 sections with their own packers            |
| `src/lib/portfolio-data.ts`                             | Add `timeline`, `techStack`, `musicPlaylist` arrays     |
| `src/lib/codeforces.functions.ts`                       | `getCodeforcesStats` server fn with 2s rate-limit cache |
| `src/lib/github-stats.functions.ts`                     | `getGithubContributions` server fn                      |
| `src/lib/gallery.functions.ts`                          | `getRandomArt` server fn (Art Institute of Chicago)     |
| `src/components/portfolio/sections/IdentitySection.tsx` | Fixed hero + contacts                                   |
| `src/components/portfolio/sections/TimelineBand.tsx`    | Written timeline                                        |
| `src/components/portfolio/sections/WorkSection.tsx`     | Astrosis + 3 projects + tech bar                        |
| `src/components/portfolio/sections/BeyondSection.tsx`   | CF, GH, music, gallery, roadmap                         |
| `src/components/portfolio/TechStackBar.tsx`             | Wide spinning tile                                      |
| `src/components/portfolio/MusicPlayer.tsx`              | Prev/play/next                                          |
| `src/components/portfolio/GalleryTile.tsx`              | Auto-cycling art                                        |
| `src/components/portfolio/CodeforcesTile.tsx`           | Live stats                                              |
| `src/components/portfolio/GithubStatsTile.tsx`          | Contributions count + mini heatmap                      |
| `src/components/portfolio/panels/GalleryPanel.tsx`      | Full-screen art viewer                                  |


Keeps: `Tile`, `PanelShell`, `Header` (used inside Identity), `AstrosisBg`, all existing panels.

## Open questions / inputs needed from you

1. **Music playlist source**: do you want me to wire up the Jamendo popular-tracks API (free, no key required for the trial endpoint), or do you have a specific list of MP3 URLs to use? Jamendo
2. **Gallery source**: I'll default to the Art Institute of Chicago API (free, no key, high-quality images). Swap to a different source if you have one in mind. No this is fine
3. **GitHub username confirm**: `UtkarshJoshiNtl` — yes?
4. **Codeforces handle confirm**: `BakedRajma`

I'll proceed with the defaults above on those four unless you say otherwise. Approve the plan and I'll build it.