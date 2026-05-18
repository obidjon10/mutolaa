"use client";

import { useRef, useState } from "react";
import { Tooltip } from "@heroui/react";

import { useAudioActions, useAudioTime } from "../context";
import { formatTime } from "../utils";

interface IProps {
  showRemaining?: boolean;
  revealOnHover?: boolean;
  className?: string;
  accentColor?: string;
  trackColor?: string;
  edgeToEdge?: boolean;
  cornerRadius?: number;
}

const SCRUBBER_BASE =
  "block w-full h-1 cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed focus:outline-none " +
  "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-full " +
  "[&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:rounded-full " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--scrubber-accent)] [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:-mt-1 " +
  "[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--scrubber-accent)] [&::-moz-range-thumb]:border-0";

const HIDE_THUMB_UNTIL_HOVER =
  "[&::-webkit-slider-thumb]:opacity-0 hover:[&::-webkit-slider-thumb]:opacity-100 focus:[&::-webkit-slider-thumb]:opacity-100 [&::-moz-range-thumb]:opacity-0 hover:[&::-moz-range-thumb]:opacity-100 focus:[&::-moz-range-thumb]:opacity-100 [&::-webkit-slider-thumb]:transition-opacity [&::-moz-range-thumb]:transition-opacity";

export const ProgressScrubber = ({
  showRemaining = false,
  revealOnHover = false,
  className = "",
  accentColor = "#ffffff",
  trackColor = "rgba(255, 255, 255, 0.25)",
  edgeToEdge = false,
  cornerRadius = 0,
}: IProps) => {
  const { currentTime, duration } = useAudioTime();
  const { seek } = useAudioActions();

  const [draftValue, setDraftValue] = useState<number | null>(null);
  const isDraggingRef = useRef(false);

  // While dragging, show the user-picked draft. Otherwise track real playback
  // time — `seek()` updates currentTime synchronously, so there's no window
  // where currentTime is stale relative to the target.
  const value = draftValue ?? currentTime;
  const max = duration > 0 ? duration : 0;
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const remaining = Math.max(0, duration - currentTime);
  const trailingTime = showRemaining
    ? `-${formatTime(remaining)}`
    : formatTime(duration);

  const commit = (next: number) => {
    isDraggingRef.current = false;
    setDraftValue(null);
    seek(next);
  };

  const rangeInput = (
    <input
      type="range"
      min={0}
      max={max || 1}
      step={0.1}
      value={value}
      disabled={!duration}
      onPointerDown={() => {
        isDraggingRef.current = true;
      }}
      onChange={(e) => {
        isDraggingRef.current = true;
        setDraftValue(Number(e.target.value));
      }}
      onPointerUp={(e) => {
        if (!isDraggingRef.current) return;
        commit(Number((e.currentTarget as HTMLInputElement).value));
      }}
      onPointerCancel={(e) => {
        if (!isDraggingRef.current) return;
        commit(Number((e.currentTarget as HTMLInputElement).value));
      }}
      onKeyUp={(e) => {
        if (draftValue === null) return;
        commit(Number((e.currentTarget as HTMLInputElement).value));
      }}
      onBlur={(e) => {
        if (draftValue === null) return;
        commit(Number((e.currentTarget as HTMLInputElement).value));
      }}
      style={
        {
          "--scrubber-accent": accentColor,
          "--scrubber-track": trackColor,
          background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${percent}%, ${trackColor} ${percent}%, ${trackColor} 100%)`,
          borderTopLeftRadius: edgeToEdge ? cornerRadius : 9999,
          borderTopRightRadius: edgeToEdge ? cornerRadius : 9999,
          borderBottomLeftRadius: edgeToEdge ? 0 : 9999,
          borderBottomRightRadius: edgeToEdge ? 0 : 9999,
        } as React.CSSProperties
      }
      className={`player-scrubber ${SCRUBBER_BASE} ${revealOnHover ? HIDE_THUMB_UNTIL_HOVER : ""}`}
      aria-label="Audio progress"
    />
  );

  if (revealOnHover) {
    return (
      <div className={`w-full ${className}`}>
        <Tooltip delay={0} closeDelay={0}>
          <Tooltip.Trigger className="block w-full bg-transparent border-0 p-0">
            {rangeInput}
          </Tooltip.Trigger>
          <Tooltip.Content
            showArrow
            placement="top left"
            className="rounded-md bg-black px-2 py-1 text-xs text-white"
          >
            <span>{formatTime(value)}</span>
          </Tooltip.Content>
          <Tooltip.Content
            showArrow
            placement="top right"
            className="rounded-md bg-black px-2 py-1 text-xs tabular-nums text-white"
          >
            <span>{trailingTime}</span>
          </Tooltip.Content>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-xs tabular-nums">{formatTime(value)}</span>
      <div className="flex-1">{rangeInput}</div>
      <span className="text-xs tabular-nums">{trailingTime}</span>
    </div>
  );
};
