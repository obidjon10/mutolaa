"use client";

import { memo } from "react";
import Image from "next/image";

import { XMarkIcon } from "@/modules/icons";

import { useAudioActions, useAudioTrack } from "../context";

import { ChaptersPopover } from "./chapters-popover";
import { PlayPauseButton } from "./play-pause-button";
import { ProgressScrubber } from "./progress-scrubber";
import { ShareButton } from "./share-button";
import { SkipButton } from "./skip-button";
import { SleepTimerButton } from "./sleep-timer-button";
import { SpeedButton } from "./speed-button";
import { VoiceEffectButton } from "./voice-effect-button";

export const MiniPlayer = memo(() => {
  const track = useAudioTrack();
  const { openFullPlayer, closePlayer } = useAudioActions();

  if (!track) return null;

  return (
    <div className="rounded-md h-23.25 mt-2 mb-4 mr-4 bg-white dark:bg-[#0f0f0f]">
      <div className="relative mx-auto max-w-400 pt-0.5 pb-2">
        <div className="absolute inset-x-0 top-0">
          <ProgressScrubber
            revealOnHover
            edgeToEdge
            accentColor="#FF6900"
            trackColor="#E5E7EB"
            cornerRadius={9999999}
          />
        </div>
        <div className="mt-2.5 flex items-center justify-between px-8 gap-4">
          <div
            onClick={openFullPlayer}
            className="relative flex items-center justify-center cursor-pointer"
          >
            <div className="absolute size-16 rounded-full bg-muted dark:bg-muted-dark" />
            <div
              className="relative overflow-hidden rounded-sm bg-neutral-800 [--book-shadow-1:rgba(15,23,42,0.08)] [--book-shadow-2:rgba(15,23,42,0.14)] dark:[--book-shadow-1:rgba(0,0,0,0.35)] dark:[--book-shadow-2:rgba(0,0,0,0.55)]"
              style={{
                width: 48,
                height: 65,
                boxShadow:
                  "0 1px 2px var(--book-shadow-1), 0 6px 14px -4px var(--book-shadow-2), 0 14px 32px -8px var(--book-shadow-1)",
              }}
            >
              <Image
                fill
                draggable={false}
                src={track.cover}
                alt={track?.title ?? ""}
                sizes="48px"
                className="absolute inset-0 size-full object-cover select-none"
                loading="eager"
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
          </div>

          <div className="flex items-center justify-center text-muted-dark dark:text-white gap-3 sm:gap-8">
            <SpeedButton />
            <SkipButton direction="back" />
            <PlayPauseButton size="sm" />
            <SkipButton direction="forward" />
            <SleepTimerButton />
          </div>

          <div className="flex gap-6 text-muted-dark dark:text-white items-center justify-end">
            <VoiceEffectButton />
            <ChaptersPopover className="pt-1.5" />
            <ShareButton />
            <button
              type="button"
              onClick={closePlayer}
              aria-label="Close player"
              className="cursor-pointer"
            >
              <XMarkIcon size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
MiniPlayer.displayName = "MiniPlayer";
