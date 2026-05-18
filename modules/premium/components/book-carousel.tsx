"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { Link } from "@/i18n/navigation";
import type { IBook } from "@/modules/common";

interface IProps {
  books: IBook[];
}

const BOOK_W = 164;
const BOOK_H = 250;
const GAP = 68;
const SLIDE_W = BOOK_W + GAP;
const VISIBLE_SLIDES = 5;
const VIEWPORT_W = SLIDE_W * VISIBLE_SLIDES;

/**
 * V-shaped arc — 5 visible books:
 *
 *  book                 book     ← bottom: 168px (±2)
 *       book       book          ← bottom: 100px (±1)
 *            book                ← bottom: 32px  (center)
 */
const BOTTOM_STEPS = [0, 68, 136];
const Z_INDEX_STEPS = [50, 35, 20];

// The visible V-shape has 5 slots (outer-left, mid-left, center, mid-right,
// outer-right), so the centered slot is index 2. We always start the carousel
// there: index 0 sits outer-left, index 2 is centered, regardless of how many
// books come back from the API. Falls back to the middle when there aren't
// enough books to fill the visible row.
const VISIBLE_CENTER_SLOT = 2;
const getStartIndex = (total: number) => {
  if (total <= 0) return 0;
  return Math.min(VISIBLE_CENTER_SLOT, Math.floor(total / 2));
};

const getInitialArcLayout = (index: number, total: number) => {
  if (total <= 0) return { bottom: BOTTOM_STEPS[0]!, zIndex: Z_INDEX_STEPS[0]! };
  const center = getStartIndex(total);
  const raw = Math.abs(index - center);
  const distance = Math.min(raw, total - raw);
  const step = Math.min(distance, 2);
  return { bottom: BOTTOM_STEPS[step]!, zIndex: Z_INDEX_STEPS[step]! };
};

export const BookCarousel = ({ books }: IProps) => {
  const t = useTranslations();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: false,
      startIndex: getStartIndex(books.length),
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );

  const applyTween = useCallback(() => {
    if (!emblaApi) return;

    const scrollProgress = emblaApi.scrollProgress();
    const snapList = emblaApi.scrollSnapList();

    snapList.forEach((scrollSnap, i) => {
      const el = slideRefs.current[i];
      if (!el) return;

      let diff = scrollSnap - scrollProgress;
      if (diff > 0.5) diff -= 1;
      if (diff < -0.5) diff += 1;

      const absDiff = Math.abs(diff);

      const normalizedDist = absDiff * books.length;
      const stepIdx = Math.min(normalizedDist, 2);
      const floor = Math.min(Math.floor(stepIdx), 1);
      const ceil = floor + 1;
      const frac = stepIdx - floor;

      const bottom =
        BOTTOM_STEPS[floor]! + (BOTTOM_STEPS[ceil]! - BOTTOM_STEPS[floor]!) * frac;

      const scale = 1;
      const zIndex = Math.round(50 - stepIdx * 15);

      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner) return;

      el.style.zIndex = String(zIndex);
      inner.style.bottom = `${bottom}px`;
      inner.style.transform = `translateX(-50%) scale(${scale})`;
    });
  }, [emblaApi, books.length]);

  useEffect(() => {
    if (!emblaApi) return;
    applyTween();
    emblaApi.on("scroll", applyTween);
    emblaApi.on("reInit", applyTween);
    return () => {
      emblaApi.off("scroll", applyTween);
      emblaApi.off("reInit", applyTween);
    };
  }, [emblaApi, applyTween]);

  return (
    <div className="-mx-8 -mt-24 flex justify-center">
      <div
        className="overflow-hidden shrink-0"
        style={{ width: VIEWPORT_W }}
        ref={emblaRef}
      >
        <div className="flex mb-8" style={{ height: BOOK_H + 200 + 32 }}>
          {books.map((book, i) => {
          const initial = getInitialArcLayout(i, books.length);
          return (
          <div
            key={book.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="relative "
            style={{ flex: `0 0 ${SLIDE_W}px`, zIndex: initial.zIndex }}
          >
            <Link
              href={`/book/${book.slug}`}
              draggable={false}
              className="absolute left-1/2 block"
              style={{
                width: BOOK_W,
                height: BOOK_H,
                bottom: initial.bottom,
                transform: "translateX(-50%) scale(1)",
                transformOrigin: "center bottom",
              }}
            >
              <div
                className="relative size-full overflow-hidden rounded-sm bg-neutral-800 shadow-[0px_1.49px_0.8px_0px_#00000017,0px_3.59px_1.93px_0px_#00000010,0px_6.76px_3.63px_0px_#0000000E,0px_12.06px_6.48px_0px_#0000000B,0px_22.56px_12.12px_0px_#00000009]"
              >
                <Image
                  fill
                  draggable={false}
                  src={book.image}
                  alt={t("muqova", { title: book.title })}
                  sizes={`${BOOK_W}px`}
                  className="absolute inset-0 size-full object-cover select-none"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-white/5"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute left-0 top-0 h-full opacity-40"
                  aria-hidden="true"
                  style={{
                    minWidth: "8.2%",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0) 12%, rgba(255,255,255,0.5) 29.25%, rgba(255,255,255,0) 50.5%, rgba(255,255,255,0) 75.25%, rgba(255,255,255,0.5) 91%, rgba(255,255,255,0)), linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.2) 12%, transparent 30%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.35) 73.5%, rgba(0,0,0,0.7) 75.25%, rgba(0,0,0,0.25) 85.25%, transparent)",
                  }}
                />
              </div>
            </Link>
          </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
