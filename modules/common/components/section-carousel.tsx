"use client";

import { ReactNode, useEffect } from "react";
import clsx from "classnames";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { ConditionalRender } from "@/modules/common";

// Embla normally observes its own container size and `reInit`s on every
// width change. When the sidebar collapses (animating width 60x/sec) every
// carousel on the page does that work in lockstep — heavy on home where
// many sections are visible. We disable container-watching here and run a
// debounced window-resize reInit instead, which covers real viewport
// changes without thrashing on sidebar animation frames.
const RESIZE_DEBOUNCE_MS = 150;

export type SectionCarouselScrollStateType = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

interface ISectionCarouselProps {
  children: ReactNode;
  ariaLabel: string;
  classNames?: string;
  hasEndSpace?: boolean;
  slideGapClass?: string;
  slidePaddingStartClass?: string;
  /** Set to read Embla API for imperative scroll (e.g. header buttons). */
  apiRef?: React.MutableRefObject<EmblaCarouselType | null>;
  /** Fired on init, scroll, and reInit when scroll availability changes. */
  onScrollStateChange?: (state: SectionCarouselScrollStateType) => void;
}

export const SectionCarousel = ({
  children,
  ariaLabel,
  classNames,
  hasEndSpace,
  slideGapClass = "gap-6",
  slidePaddingStartClass = "pl-6 sm:pl-8",
  apiRef,
  onScrollStateChange,
}: ISectionCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    // dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
    skipSnaps: true,
    watchResize: false,
  });

  // Watch the carousel container ourselves with a debounce so the sidebar
  // collapse animation (which fires resize events ~60x/sec) only triggers
  // a single re-init after it settles, instead of one per frame per carousel.
  useEffect(() => {
    if (!emblaApi) return;
    const node = emblaApi.rootNode();
    if (!node) return;
    let timeoutId: number | undefined;
    const schedule = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(
        () => emblaApi.reInit(),
        RESIZE_DEBOUNCE_MS,
      );
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(node);
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(timeoutId);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (apiRef) {
      apiRef.current = emblaApi ?? null;
    }
  }, [emblaApi, apiRef]);

  useEffect(() => {
    if (!emblaApi || !onScrollStateChange) return;
    // Embla fires `reInit` on every container resize. During a sidebar
    // collapse the container widens 60x/sec — without this dedup we'd push
    // a new state object every frame and re-render the whole section.
    let lastPrev: boolean | null = null;
    let lastNext: boolean | null = null;
    const emit = () => {
      const canScrollPrev = emblaApi.canScrollPrev();
      const canScrollNext = emblaApi.canScrollNext();
      if (canScrollPrev === lastPrev && canScrollNext === lastNext) return;
      lastPrev = canScrollPrev;
      lastNext = canScrollNext;
      onScrollStateChange({ canScrollPrev, canScrollNext });
    };
    emit();
    emblaApi.on("select", emit);
    emblaApi.on("reInit", emit);
    return () => {
      emblaApi.off("select", emit);
      emblaApi.off("reInit", emit);
    };
  }, [emblaApi, onScrollStateChange]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!emblaApi) return;
    if (event.key === "ArrowRight" && emblaApi.canScrollNext()) {
      event.preventDefault();
      emblaApi.scrollNext();
    } else if (event.key === "ArrowLeft" && emblaApi.canScrollPrev()) {
      event.preventDefault();
      emblaApi.scrollPrev();
    }
  };

  return (
    <div
      ref={emblaRef}
      role="region"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className="overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
    >
      <div
        className={clsx(
          "flex",
          slideGapClass,
          slidePaddingStartClass,
          classNames,
        )}
      >
        {children}
        <ConditionalRender if={hasEndSpace}>
          <div aria-hidden="true" className="shrink-0 w-6 sm:w-8" />
        </ConditionalRender>
      </div>
    </div>
  );
};
