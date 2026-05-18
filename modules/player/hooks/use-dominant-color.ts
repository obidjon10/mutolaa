"use client";

import { useEffect, useState } from "react";

type Rgb = { r: number; g: number; b: number };

const rgbToCss = ({ r, g, b }: Rgb) => `rgb(${r}, ${g}, ${b})`;

const rgbToHsl = ({ r, g, b }: Rgb) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }
  return { h, s, l };
};

// Clamp a color to a comfortable range to use as a page background
// (not too bright, not too washed out).
const normalizeForBackground = (rgb: Rgb): Rgb => {
  const { h, s, l } = rgbToHsl(rgb);
  const targetS = Math.min(Math.max(s, 0.35), 0.7);
  const targetL = Math.min(Math.max(l, 0.28), 0.42);
  return hslToRgb(h, targetS, targetL);
};

const hslToRgb = (h: number, s: number, l: number): Rgb => {
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
};

const extractDominantColor = (img: HTMLImageElement): Rgb | null => {
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, size, size);

  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, size, size).data;
  } catch {
    // Canvas tainted (CORS). Caller will fall back.
    return null;
  }

  const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 200) continue;

    const { s, l } = rgbToHsl({ r, g, b });
    // Skip near-white, near-black, and very desaturated pixels so we get a
    // meaningful accent color rather than paper/shadow tones.
    if (l < 0.1 || l > 0.92) continue;
    if (s < 0.2) continue;

    const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
    const prev = buckets.get(key);
    if (prev) {
      prev.count += 1;
      prev.r += r;
      prev.g += g;
      prev.b += b;
    } else {
      buckets.set(key, { count: 1, r, g, b });
    }
  }

  let best: { count: number; r: number; g: number; b: number } | null = null;
  for (const bucket of buckets.values()) {
    if (!best || bucket.count > best.count) best = bucket;
  }
  if (!best) return null;
  return {
    r: Math.round(best.r / best.count),
    g: Math.round(best.g / best.count),
    b: Math.round(best.b / best.count),
  };
};

export type DominantColor = {
  base: string;
  dark: string;
};

export const useDominantColor = (src: string | undefined): DominantColor | null => {
  const [color, setColor] = useState<DominantColor | null>(null);

  useEffect(() => {
    if (!src) {
      setColor(null);
      return;
    }

    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = src;

    const handleLoad = () => {
      if (cancelled) return;
      const raw = extractDominantColor(img);
      if (!raw) {
        setColor(null);
        return;
      }
      const base = normalizeForBackground(raw);
      const { h, s, l } = rgbToHsl(base);
      const dark = hslToRgb(h, s, Math.max(0.08, l - 0.28));
      setColor({ base: rgbToCss(base), dark: rgbToCss(dark) });
    };

    const handleError = () => {
      if (!cancelled) setColor(null);
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    return () => {
      cancelled = true;
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src]);

  return color;
};
