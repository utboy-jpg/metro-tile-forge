export type TileKey = string;
export type Size = { w: number; h: number };
export type Placed = { key: TileKey; x: number; y: number; w: number; h: number };

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// mulberry32 for deterministic per-seed shuffles
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Static class maps so Tailwind JIT keeps all variants.
export const COL_M: Record<number, string> = { 1: "col-span-1", 2: "col-span-2" };
export const ROW_M: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
};
export const COL_D: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};
export const ROW_D: Record<number, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
  4: "md:row-span-4",
};

export function pack(
  cols: number,
  order: TileKey[],
  seed: number,
  variants: Record<string, Size[]>,
): Placed[] {
  const rand = mulberry32(seed);
  const grid: (TileKey | null)[][] = [];
  const ensureRow = (y: number) => {
    while (grid.length <= y) grid.push(Array(cols).fill(null));
  };
  const findFirstEmpty = () => {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x] === null) return { x, y };
      }
    }
    ensureRow(grid.length);
    return { x: 0, y: grid.length - 1 };
  };
  const maxWidthFrom = (x: number, y: number) => {
    let w = 0;
    for (let i = x; i < cols; i++) {
      if (grid[y][i] === null) w++;
      else break;
    }
    return w;
  };
  const canFit = (x: number, y: number, w: number, h: number) => {
    if (x + w > cols) return false;
    for (let dy = 0; dy < h; dy++) {
      ensureRow(y + dy);
      for (let dx = 0; dx < w; dx++) {
        if (grid[y + dy][x + dx] !== null) return false;
      }
    }
    return true;
  };

  const placed: Placed[] = [];

  for (const key of order) {
    const v = variants[key];
    if (!v) continue;
    const { x, y } = findFirstEmpty();
    const maxW = maxWidthFrom(x, y);
    const choices = shuffle(v, rand);
    let chosen: Size | null = null;
    for (const c of choices) {
      const w = Math.min(c.w, maxW);
      const h = c.h;
      if (canFit(x, y, w, h)) {
        chosen = { w, h };
        break;
      }
    }
    if (!chosen) chosen = { w: maxW, h: 1 };
    for (let dy = 0; dy < chosen.h; dy++) {
      ensureRow(y + dy);
      for (let dx = 0; dx < chosen.w; dx++) {
        grid[y + dy][x + dx] = key;
      }
    }
    placed.push({ key, x, y, w: chosen.w, h: chosen.h });
  }

  // Absorb leftover empties into neighboring tiles to eliminate gaps.
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] !== null) continue;
      const above = y > 0 ? grid[y - 1][x] : null;
      const left = x > 0 ? grid[y][x - 1] : null;
      const target = above ?? left;
      if (!target) continue;
      const p = placed.find(
        (pp) =>
          pp.key === target &&
          x >= pp.x &&
          x < pp.x + pp.w &&
          y >= pp.y &&
          y <= pp.y + pp.h,
      );
      if (p) {
        if (above === target) p.h = Math.max(p.h, y - p.y + 1);
        else p.w = Math.max(p.w, x - p.x + 1);
        grid[y][x] = target;
      }
    }
  }

  return placed;
}
