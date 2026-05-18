"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

interface IBookCardProps {
  title: string;
  cover: string;
  slug: string;
  /** Design dimensions — set the aspect ratio and the SSR baseline for 3D math. */
  width?: number;
  height?: number;
}

const BOOK_SPINE_GRADIENT =
  "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0) 12%, rgba(255,255,255,0.5) 29.25%, rgba(255,255,255,0) 50.5%, rgba(255,255,255,0) 75.25%, rgba(255,255,255,0.5) 91%, rgba(255,255,255,0)), linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.2) 12%, transparent 30%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.35) 73.5%, rgba(0,0,0,0.7) 75.25%, rgba(0,0,0,0.25) 85.25%, transparent)";

// Hint matches `--shelf-book-w: clamp(60px, 11vw, 220px)` on HeroSection so
// next/image picks an appropriately-sized variant at every breakpoint.
const SHELF_BOOK_SIZES =
  "(min-width: 2000px) 220px, (max-width: 545px) 60px, 11vw";

export function ShelfBookCard({
  title,
  cover,
  slug,
  width = 142,
  height = 217,
}: IBookCardProps) {
  const t = useTranslations();
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Seed with the design width so SSR HTML matches the first paint —
  // ResizeObserver then snaps to the real width on mount.
  const [renderedWidth, setRenderedWidth] = useState(width);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry?.contentRect.width;
      if (w && w > 0) setRenderedWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const depth = Math.round(renderedWidth * 0.12);
  const spineWidth = Math.round(depth * 1.4);

  return (
    <Link
      href={`/book/${slug}`}
      className="group flex flex-col bg-transparent"
    >
      <div className="flex justify-center overflow-visible px-1 sm:px-2">
        <div className="z-10 perspective-midrange [--book-shadow-1:rgba(15,23,42,0.08)] [--book-shadow-2:rgba(15,23,42,0.14)] dark:[--book-shadow-1:rgba(0,0,0,0.35)] dark:[--book-shadow-2:rgba(0,0,0,0.55)] drop-shadow-[0_8px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
          <div
            ref={wrapperRef}
            className="relative rounded-lg transform-3d transform-[rotateY(0deg)] group-hover:transform-[rotateY(-28deg)] motion-reduce:transition-none motion-reduce:group-hover:transform-[rotateY(0deg)]"
            style={{
              width: "var(--shelf-book-w)",
              aspectRatio: `${width} / ${height}`,
              transition: "transform 720ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div
              className="absolute inset-0 rounded-sm overflow-hidden bg-neutral-800"
              style={{
                transform: `translateZ(${depth}px)`,
                boxShadow:
                  "0 1px 2px var(--book-shadow-1), 0 6px 14px -4px var(--book-shadow-2), 0 14px 32px -8px var(--book-shadow-1)",
              }}
            >
              <Image
                fill
                src={cover}
                loading="eager"
                sizes={SHELF_BOOK_SIZES}
                alt={t("muqova", { title })}
                className="absolute inset-0 size-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-white/5"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-0 top-0 h-full opacity-40"
                aria-hidden="true"
                style={{ minWidth: "8.2%", background: BOOK_SPINE_GRADIENT }}
              />
            </div>

            <div
              className="absolute left-0 bg-white"
              aria-hidden="true"
              style={{
                top: 3,
                bottom: 3,
                width: spineWidth,
                transform: `translateX(${renderedWidth - depth}px) rotateY(90deg)`,
                background: "linear-gradient(90deg, #fff 50%, #f9f9f9 50%)",
                boxShadow: "rgba(0,0,0,0.08) -1px 0 2px inset",
              }}
            />

            <div
              className="absolute inset-0 overflow-hidden rounded-sm bg-neutral-900"
              aria-hidden="true"
              style={{
                transform: `translateZ(-${depth}px)`,
                boxShadow:
                  "-4px 0 16px -4px var(--book-shadow-1), -10px 0 28px -8px var(--book-shadow-2)",
              }}
            >
              <Image
                fill
                src={cover}
                sizes={SHELF_BOOK_SIZES}
                alt={t("muqova_orti", { title })}
                className="size-full object-cover brightness-[0.4] saturate-[0.85]"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
