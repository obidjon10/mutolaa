"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const LG_MEDIA_QUERY = "(min-width: 1024px)";
const BOTTOM_GAP = 32;

interface IOptions {
  // Element whose height should offset the top stick point (e.g., a sticky header).
  offsetTopRef?: RefObject<HTMLElement | null>;
}

// Two-way sticky: panel scrolls with content until it hits a viewport edge,
// then sticks to that edge until the user reverses direction. Achieved by
// keeping `position: sticky` and shifting `top` by -delta on each scroll
// (clamped to [(viewportHeight - offsetTop) - panelHeight, offsetTop]).
export const useTwoWayStickyScroll = <T extends HTMLElement>({
  offsetTopRef,
}: IOptions = {}) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const panel = ref.current;
    if (!panel) return;

    const mediaQuery = window.matchMedia(LG_MEDIA_QUERY);

    let topOffset = 0;
    let lastScrollY = window.scrollY;
    let rafId: number | null = null;

    const apply = () => {
      rafId = null;

      if (!mediaQuery.matches) {
        panel.style.position = "";
        panel.style.top = "";
        return;
      }

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      const panelHeight = panel.offsetHeight;
      const viewportHeight = window.innerHeight;
      const offsetTop = offsetTopRef?.current?.offsetHeight ?? 0;
      const usableHeight = viewportHeight - offsetTop;

      panel.style.position = "sticky";

      if (panelHeight <= usableHeight - BOTTOM_GAP) {
        topOffset = offsetTop;
      } else {
        const maxTop = offsetTop;
        const minTop = viewportHeight - panelHeight - BOTTOM_GAP;
        topOffset = Math.max(minTop, Math.min(maxTop, topOffset - delta));
      }

      panel.style.top = `${topOffset}px`;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(apply);
    };

    const onLayoutChange = () => {
      lastScrollY = window.scrollY;
      apply();
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onLayoutChange);
    mediaQuery.addEventListener("change", onLayoutChange);

    const resizeObserver = new ResizeObserver(onLayoutChange);
    resizeObserver.observe(panel);
    if (offsetTopRef?.current) {
      resizeObserver.observe(offsetTopRef.current);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onLayoutChange);
      mediaQuery.removeEventListener("change", onLayoutChange);
      resizeObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [offsetTopRef]);

  return ref;
};
