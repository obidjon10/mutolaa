"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { Button, Drawer } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";

import { BookCover } from "@/modules/common";
import { ChevronDownIcon, VoiceEffectIcon } from "@/modules/icons";

import { useAudioActions, useAudioPlayback, useAudioTrack } from "../context";
import { useDominantColor } from "../hooks/use-dominant-color";

import { ChaptersPopover } from "./chapters-popover";
import { PlayPauseButton } from "./play-pause-button";
import { ProgressScrubber } from "./progress-scrubber";
import { ShareButton } from "./share-button";
import { SkipButton } from "./skip-button";
import { SleepTimerButton } from "./sleep-timer-button";
import { SpeedButton } from "./speed-button";
import { VoiceEffectButton } from "./voice-effect-button";

export const FullPlayerDrawer = memo(() => {
  const t = useTranslations();
  const track = useAudioTrack();
  const { isFullPlayerOpen, soundEffect } = useAudioPlayback();
  const { closeFullPlayer } = useAudioActions();
  const dominant = useDominantColor(track?.cover);

  if (!track) return null;

  const background = dominant
    ? `linear-gradient(to bottom, ${dominant.base} 0%, ${dominant.dark} 100%)`
    : "linear-gradient(to bottom, #3f4148 0%, #1f2125 100%)";

  return (
    <Drawer.Root
      isOpen={isFullPlayerOpen}
      onOpenChange={(open) => {
        if (!open) closeFullPlayer();
      }}
    >
      <Drawer.Backdrop>
        <Drawer.Content placement="bottom" className="h-screen">
          <Drawer.Dialog className="p-0 h-screen max-h-screen! rounded-none!">
            <div
              className="relative flex h-full flex-col text-white transition-[background] duration-500 ease-out"
              style={{ background }}
            >
              <div className="flex justify-end p-6">
                <Button
                  isIconOnly
                  type="button"
                  onClick={closeFullPlayer}
                  className="flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Close player"
                >
                  <ChevronDownIcon />
                </Button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center px-6">
                {/* <div className="relative w-[] overflow-hidden rounded-md shadow-2xl">
                  {track.cover ? (
                    <Image
                      fill
                      src={track.cover}
                      alt={track.title}
                      sizes="256px"
                      className="object-cover"
                      priority
                    />
                  ) : null}
                </div> */}
                <div className="relative flex items-center justify-center cursor-pointer">
                  <div className="absolute size-54 rounded-full bg-white/15 dark:bg-black/15" />
                  <BookCover
                    cover={track.cover || ""}
                    title={track.title || "BOOK TITLE"}
                    width={164}
                    height={220}
                    interactive
                  />
                </div>

                <h1 className="mt-8 text-center text-2xl font-semibold">
                  {track.title}
                </h1>
                {track.subtitle ? (
                  <p className="mt-2 text-center text-sm text-gray-300">
                    {track.subtitle}
                  </p>
                ) : null}
              </div>

              <div className="px-12 pb-8 pt-4">
                <AnimatePresence>
                  {soundEffect && (
                    <motion.div
                      key="voice-effect-badge"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex justify-center mb-7.5"
                    >
                      <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white">
                        <VoiceEffectIcon size={14} />
                        <span>{t("tovushbezak_yoqilgan")}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <ProgressScrubber showRemaining className="mb-6" />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex w-20 items-center justify-start">
                    <VoiceEffectButton />
                  </div>

                  <div className="flex flex-1 items-center justify-center gap-11">
                    <SpeedButton />
                    <SkipButton direction="back" size={26} />
                    <PlayPauseButton size="lg" variant="ghost" />
                    <SkipButton direction="forward" size={26} />
                    <SleepTimerButton />
                  </div>

                  <div className="flex w-20 gap-6 items-center justify-end">
                    <ChaptersPopover />
                    <ShareButton />
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer.Root>
  );
});
FullPlayerDrawer.displayName = "FullPlayerDrawer";
