"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface IProps {
  label?: string;
  enabled: boolean;
  children: ReactNode;
}

const HOVER_DELAY_MS = 350;

/**
 * Right-placed tooltip with arrow shown only when the sidebar is collapsed.
 *
 * Rendered via a portal into <body> with `position: fixed` so it escapes
 * the sidebar's `overflow-x-hidden` clip.
 *
 * Two safeguards prevent the tooltip from popping up when the user
 * doesn't intend it:
 *
 * 1. "Armed" gate — when the wrapper mounts (e.g., after the user clicks
 *    the collapse button), the cursor is often still over the new
 *    wrapper. We start un-armed; the first `mouseleave` arms us so future
 *    real hovers work.
 *
 * 2. Hover delay — a short setTimeout means a spurious mouseenter (from
 *    layout shift, focus motion, etc.) is cancelled if the cursor leaves
 *    or the user clicks within the delay window.
 *
 * The tooltip also dismisses on mousedown so it never lingers after a
 * click (clicks don't fire mouseleave when the cursor stays put).
 */
export function SidebarTooltip({ label, enabled, children }: IProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const armedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!enabled) {
      armedRef.current = false;
      return;
    }
    armedRef.current = !wrapperRef.current?.matches(":hover");
  }, [enabled]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  if (!enabled || !label) return children;

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const show = () => {
    if (!armedRef.current || !wrapperRef.current) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      if (wrapperRef.current) {
        setRect(wrapperRef.current.getBoundingClientRect());
      }
    }, HOVER_DELAY_MS);
  };

  const hide = () => {
    armedRef.current = true;
    clearTimer();
    setRect(null);
  };

  // Click never fires mouseleave when the cursor is stationary, so the
  // tooltip would linger. Dismiss it explicitly on mousedown.
  const dismiss = () => {
    clearTimer();
    setRect(null);
  };

  return (
    <div
      ref={wrapperRef}
      className="w-full"
      onMouseEnter={show}
      onMouseLeave={hide}
      onMouseDown={dismiss}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {rect &&
        createPortal(
          <div
            role="tooltip"
            style={{
              top: rect.top + rect.height / 2,
              left: rect.right + 12,
            }}
            className="pointer-events-none fixed z-60 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/85 px-2.5 py-1.5 text-xs font-medium text-white"
          >
            {label}
            <span
              aria-hidden
              className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rotate-45 bg-black/85"
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
