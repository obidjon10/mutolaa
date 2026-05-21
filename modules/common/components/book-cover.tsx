"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

const BOOK_SPINE_GRADIENT =
  "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0) 12%, rgba(255,255,255,0.5) 29.25%, rgba(255,255,255,0) 50.5%, rgba(255,255,255,0) 75.25%, rgba(255,255,255,0.5) 91%, rgba(255,255,255,0)), linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.2) 12%, transparent 30%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.35) 73.5%, rgba(0,0,0,0.7) 75.25%, rgba(0,0,0,0.25) 85.25%, transparent)";

type BookCoverShadowType = "none" | "sm" | "md" | "lg";

interface IBookCoverProps {
  cover: string;
  title: string;
  /**
   * Design dimensions. Set the aspect-ratio and act as the SSR / pre-measurement
   * baseline for the 3D depth and spine math (so SSR HTML matches the first
   * client paint). When `fluid` is false (default) they also size the cover in
   * pixels; when `fluid` is true the rendered width comes from CSS instead and
   * a ResizeObserver feeds the actual width back into the 3D math.
   */
  width: number;
  height: number;
  /**
   * Drop the fixed pixel width and let the caller size the cover via CSS
   * (e.g. `className="w-32 sm:w-40 lg:w-50"`). Aspect-ratio keeps the height
   * in proportion. Pair with a media-aware `sizes` for accurate image picking.
   */
  fluid?: boolean;
  /**
   * Width hint forwarded to next/image's `sizes`. Defaults to the measured
   * rendered width in CSS pixels. For fluid covers, prefer a media-aware
   * value like `"(min-width: 1024px) 200px, (min-width: 640px) 160px, 128px"`.
   */
  sizes?: string;
  interactive?: boolean;
  className?: string;
  /**
   * Tailwind rounding utility applied to the cover's front/back faces.
   * @default "rounded-md"
   */
  rounded?: string;
  /**
   * Controls the strength of the drop shadow under the front cover and
   * behind the back cover.
   * @default "md"
   */
  shadow?: BookCoverShadowType;
  wrapperStyle?: React.CSSProperties;
}

const FRONT_SHADOWS: Record<BookCoverShadowType, string> = {
  none: "none",
  sm: "0 1px 1px var(--book-shadow-1), 0 2px 4px -2px var(--book-shadow-2)",
  md: "0 1px 2px var(--book-shadow-1), 0 6px 14px -4px var(--book-shadow-2), 0 14px 32px -8px var(--book-shadow-1)",
  lg: "0 2px 4px var(--book-shadow-1), 0 10px 22px -4px var(--book-shadow-2), 0 24px 48px -8px var(--book-shadow-1)",
};

const BACK_SHADOWS: Record<BookCoverShadowType, string> = {
  none: "none",
  sm: "-2px 0 6px -2px var(--book-shadow-1)",
  md: "-4px 0 16px -4px var(--book-shadow-1), -10px 0 28px -8px var(--book-shadow-2)",
  lg: "-6px 0 22px -4px var(--book-shadow-1), -16px 0 44px -8px var(--book-shadow-2)",
};

const getDepth = (w: number) => Math.max(2, Math.round(w * 0.13));

export function BookCover({
  cover,
  title,
  width,
  height,
  fluid = false,
  sizes,
  interactive = false,
  className,
  rounded = "rounded-md",
  shadow = "md",
  wrapperStyle,
}: IBookCoverProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frontImgRef = useRef<HTMLImageElement>(null);
  // Seed with the design width so SSR + first client render produce identical
  // depth/spine values — no hydration jump before ResizeObserver fires.
  const [renderedWidth, setRenderedWidth] = useState(width);

  useLayoutEffect(() => {
    if (!fluid || !wrapperRef.current) return;
    const el = wrapperRef.current;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry?.contentRect.width;
      if (w && w > 0) setRenderedWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [fluid]);

  // Cached-image safety net: if the cover comes from the browser cache it can
  // finish loading before React attaches the onLoad handler, and the load
  // event is silently missed. Checking `.complete` on mount catches that case
  // so isLoaded still flips and the opacity transition still plays.
  useEffect(() => {
    if (frontImgRef.current?.complete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true);
    }
  }, []);

  const depth = getDepth(renderedWidth);
  const spineWidth = Math.round(depth * 1.4);
  const imageSizes = sizes ?? `${Math.round(renderedWidth)}px`;

  return (
    <div
      ref={wrapperRef}
      className={`z-10 perspective-midrange [--book-shadow-1:rgba(15,23,42,0.08)] [--book-shadow-2:rgba(15,23,42,0.14)] dark:[--book-shadow-1:rgba(0,0,0,0.35)] dark:[--book-shadow-2:rgba(0,0,0,0.55)] ${
        fluid ? "" : "w-min"
      } ${className ?? ""}`}
      style={{
        aspectRatio: `${width} / ${height}`,
        ...(fluid ? null : { width, height }),
        ...wrapperStyle,
      }}
    >
      <div
        className={`relative w-full h-full ${rounded} transform-3d ${
          interactive
            ? "transform-[rotateY(0deg)] group-hover:transform-[rotateY(-28deg)] motion-reduce:transition-none motion-reduce:group-hover:transform-[rotateY(0deg)]"
            : ""
        }`}
        style={{
          transition: interactive
            ? "transform 720ms cubic-bezier(0.22, 1, 0.36, 1)"
            : undefined,
        }}
      >
        <div
          className={`absolute inset-0 ${rounded} overflow-hidden ${
            isLoaded ? "" : "animate-pulse bg-gray-200 dark:bg-neutral-800"
          }`}
          style={{
            transform: `translateZ(${depth}px)`,
            boxShadow: FRONT_SHADOWS[shadow],
          }}
        >
          <Image
            ref={frontImgRef}
            src={cover}
            alt={`Muqova: ${title}`}
            fill
            sizes={imageSizes}
            onLoad={() => setIsLoaded(true)}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
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
          className={`absolute ${rounded} inset-0 overflow-hidden ${
            isLoaded
              ? "bg-neutral-900"
              : "animate-pulse bg-gray-300 dark:bg-neutral-900"
          }`}
          aria-hidden="true"
          style={{
            transform: `translateZ(-${depth}px)`,
            boxShadow: BACK_SHADOWS[shadow],
          }}
        >
          <Image
            src={cover}
            alt=""
            fill
            sizes={imageSizes}
            className={`size-full object-cover brightness-[0.4] saturate-[0.85] transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
