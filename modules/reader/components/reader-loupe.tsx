"use client";

import { useEffect, useRef } from "react";
import html2canvas from "html2canvas-pro";

interface IReaderLoupeProps {
  active: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const SIZE = 220;
const HALF = SIZE / 2;
const ZOOM = 2;
const SNAPSHOT_DEBOUNCE_MS = 150;
const CURSOR_STYLE_ID = "mutolaa-loupe-cursor-style";

export function ReaderLoupe({ active, containerRef }: IReaderLoupeProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (!active || !container || !wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // ---------- mutable state (no React re-renders) ----------
    let snapshot: HTMLCanvasElement | null = null;
    let iRect: DOMRect | null = null;
    let cRect: DOMRect | null = container.getBoundingClientRect();
    let px = 0;
    let py = 0;
    let hasPos = false;
    let rafId = 0;
    let snapshotTimer: ReturnType<typeof setTimeout> | null = null;
    let snapshotToken = 0;
    let iframeDoc: Document | null = null;
    let cancelled = false;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ---------- helpers ----------
    const findIframe = (): HTMLIFrameElement | null =>
      container.querySelector("iframe");

    const hideCursor = (doc: Document) => {
      if (doc.getElementById(CURSOR_STYLE_ID)) return;
      const style = doc.createElement("style");

      style.id = CURSOR_STYLE_ID;
      style.textContent = `html,body,*,*::before,*::after{cursor:none!important}`;
      doc.head?.appendChild(style);
    };

    const restoreCursor = (doc: Document) => {
      doc.getElementById(CURSOR_STYLE_ID)?.remove();
    };

    const prevOuterCursor = container.style.cursor;

    container.style.cursor = "none";
    wrapper.style.visibility = "hidden";

    // ---------- snapshot (debounced + tokenized) ----------
    const takeSnapshot = async () => {
      const iframe = findIframe();
      const body = iframe?.contentDocument?.body;

      if (!iframe || !body) return;

      // Epub.js hasn't injected content yet — retry until text is present
      if (!body.textContent?.trim()) {
        if (!cancelled) snapshotTimer = setTimeout(takeSnapshot, 300);
        return;
      }

      snapshotToken += 1;
      const token = snapshotToken;

      try {
        const result = await html2canvas(body, {
          backgroundColor: null,
          useCORS: true,
          logging: false,
          scale: ZOOM,
        });

        if (cancelled || token !== snapshotToken) return;
        snapshot = result;
        iRect = iframe.getBoundingClientRect();
        cRect = container.getBoundingClientRect();
        requestDraw();
      } catch {
        /* snapshot may fail (cross-origin images); skip */
      }
    };

    const scheduleSnapshot = () => {
      if (snapshotTimer) clearTimeout(snapshotTimer);
      snapshotTimer = setTimeout(takeSnapshot, SNAPSHOT_DEBOUNCE_MS);
    };

    // ---------- draw (rAF-coalesced) ----------
    const draw = () => {
      rafId = 0;
      if (!hasPos) return;

      wrapper.style.transform = `translate3d(${px - HALF}px, ${py - HALF}px, 0)`;
      wrapper.style.visibility = "visible";

      if (!snapshot || !iRect || !cRect) return;

      ctx.clearRect(0, 0, SIZE, SIZE);

      const ifxX = px + cRect.left - iRect.left;
      const ifxY = py + cRect.top - iRect.top;
      const sx = ifxX * ZOOM - HALF;
      const sy = ifxY * ZOOM - HALF;

      ctx.save();
      ctx.beginPath();
      ctx.arc(HALF, HALF, HALF, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.drawImage(snapshot, sx, sy, SIZE, SIZE, 0, 0, SIZE, SIZE);
      ctx.restore();
    };

    const requestDraw = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(draw);
    };

    // ---------- pointer tracking (no React state) ----------
    const onContainerMove = (e: PointerEvent) => {
      if (!cRect) cRect = container.getBoundingClientRect();
      px = e.clientX - cRect.left;
      py = e.clientY - cRect.top;
      hasPos = true;
      requestDraw();
    };

    const onIframeMove = (e: PointerEvent) => {
      if (!iRect || !cRect) return;
      px = iRect.left - cRect.left + e.clientX;
      py = iRect.top - cRect.top + e.clientY;
      hasPos = true;
      requestDraw();
    };

    const onLeave = () => {
      hasPos = false;
      wrapper.style.visibility = "hidden";
    };

    container.addEventListener("pointermove", onContainerMove);
    container.addEventListener("pointerleave", onLeave);

    // ---------- iframe attachment ----------
    const attachToIframe = () => {
      const iframe = findIframe();
      const doc = iframe?.contentDocument ?? null;

      if (!doc || iframeDoc === doc) return;

      if (iframeDoc) {
        iframeDoc.removeEventListener("pointermove", onIframeMove);
        iframeDoc.removeEventListener("pointerleave", onLeave);
        restoreCursor(iframeDoc);
      }

      iframeDoc = doc;
      iRect = iframe!.getBoundingClientRect();
      hideCursor(doc);
      doc.addEventListener("pointermove", onIframeMove);
      doc.addEventListener("pointerleave", onLeave);
      scheduleSnapshot();
    };

    attachToIframe();

    // Only watch for iframe add/remove on the direct subtree, not every mutation.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const n of m.addedNodes) {
          if (
            n instanceof HTMLIFrameElement ||
            (n instanceof HTMLElement && n.querySelector("iframe"))
          ) {
            attachToIframe();

            return;
          }
        }
      }
    });

    mo.observe(container, { childList: true, subtree: true });

    // Update cached rects on resize/scroll; re-snapshot only on resize.
    const onResize = () => {
      cRect = container.getBoundingClientRect();
      const iframe = findIframe();

      if (iframe) iRect = iframe.getBoundingClientRect();
      scheduleSnapshot();
      requestDraw();
    };

    const onScroll = () => {
      cRect = container.getBoundingClientRect();
      const iframe = findIframe();

      if (iframe) iRect = iframe.getBoundingClientRect();
      requestDraw();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (snapshotTimer) clearTimeout(snapshotTimer);
      container.style.cursor = prevOuterCursor;
      container.removeEventListener("pointermove", onContainerMove);
      container.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
      mo.disconnect();
      if (iframeDoc) {
        iframeDoc.removeEventListener("pointermove", onIframeMove);
        iframeDoc.removeEventListener("pointerleave", onLeave);
        restoreCursor(iframeDoc);
      }
      wrapper.style.visibility = "hidden";
    };
  }, [active, containerRef]);

  if (!active) return null;

  const BORDER = 5;

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-30 rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        visibility: "hidden",
        willChange: "transform",
        boxShadow: [
          "0 0 0 1px rgba(255,255,255,0.12)",
          "0 8px 40px rgba(0,0,0,0.50)",
          "0 2px 12px rgba(0,0,0,0.28)",
        ].join(", "),
      }}
    >
      {/* Canvas clipped to circle — inner area only */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
      >
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          style={{ width: SIZE, height: SIZE, display: "block" }}
        />
      </div>

      {/* Liquid glass ring — masked to the outer BORDER pixels only */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: [
            "linear-gradient(145deg,",
            "  rgba(255,255,255,0.82)  0%,",
            "  rgba(255,255,255,0.46) 18%,",
            "  rgba(255,255,255,0.10) 42%,",
            "  rgba(255,255,255,0.24) 68%,",
            "  rgba(255,255,255,0.10) 100%",
            ")",
          ].join(" "),
          backdropFilter: "blur(10px) saturate(160%)",
          WebkitBackdropFilter: "blur(10px) saturate(160%)",
          maskImage: `radial-gradient(circle at center, transparent ${HALF - BORDER - 0.5}px, black ${HALF - BORDER}px)`,
          WebkitMaskImage: `radial-gradient(circle at center, transparent ${HALF - BORDER - 0.5}px, black ${HALF - BORDER}px)`,
        }}
      />
    </div>
  );
}
