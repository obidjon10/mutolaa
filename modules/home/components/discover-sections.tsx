"use client";

import { useCallback, useEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { useDiscoverSectionList } from "../hooks";

import { SectionListSkeleton, SectionRenderer } from "./sections";

const ESTIMATED_SECTION_HEIGHT = 380;
const OVERSCAN = 2;

export const DiscoverSections = () => {
  const {
    discoverSections,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useDiscoverSectionList();

  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(
    null,
  );
  const [scrollMargin, setScrollMargin] = useState(0);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerNode(node);
  }, []);

  useEffect(() => {
    if (!containerNode) return;

    // ResizeObserver on body fires every animation frame while the sidebar
    // collapses (the Categories chips re-wrap as content widens). Coalesce
    // bursts into one measurement per frame, and skip setState when the
    // resolved scroll margin hasn't actually changed.
    let rafId = 0;
    const measure = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const next =
          containerNode.getBoundingClientRect().top + window.scrollY;
        setScrollMargin((prev) => (prev === next ? prev : next));
      });
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measure);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerNode]);

  const virtualizer = useVirtualizer({
    count: discoverSections?.length ?? 0,
    estimateSize: () => ESTIMATED_SECTION_HEIGHT,
    overscan: OVERSCAN,
    scrollMargin,
    getScrollElement: () => document.documentElement,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const last = virtualItems?.[virtualItems?.length - 1];
    if (!last) return;
    if (
      last?.index >= (discoverSections?.length ?? 0) - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    virtualItems,
    discoverSections?.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  if (isLoading) return <SectionListSkeleton count={3} />;
  if (isError && !discoverSections?.length) return null;

  return (
    <div ref={setContainerRef}>
      <div
        className="relative w-full"
        style={{ height: virtualizer?.getTotalSize() }}
      >
        {virtualItems?.map((virtualRow) => {
          const section = discoverSections?.[virtualRow?.index];
          if (!section) return null;

          return (
            <div
              key={virtualRow?.key}
              data-index={virtualRow?.index}
              ref={virtualizer?.measureElement}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${(virtualRow?.start ?? 0) - (virtualizer?.options?.scrollMargin ?? 0)}px)`,
                // Let the browser skip layout/paint work for sections that
                // are scrolled out of view — including during sidebar collapse
                // reflows.
                contentVisibility: "auto",
                containIntrinsicSize: `1px ${ESTIMATED_SECTION_HEIGHT}px`,
              }}
            >
              <SectionRenderer section={section} />
            </div>
          );
        })}
      </div>
      {isFetchingNextPage ? (
        <div className="mt-6">
          <SectionListSkeleton count={1} />
        </div>
      ) : null}
    </div>
  );
};
