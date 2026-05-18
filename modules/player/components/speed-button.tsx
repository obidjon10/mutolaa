"use client";

import { useAudioActions, useAudioPlayback, useAudioTrack } from "../context";

export const SpeedButton = ({ className = "" }: { className?: string }) => {
  const { playbackRate } = useAudioPlayback();
  const { cyclePlaybackRate } = useAudioActions();
  const track = useAudioTrack();

  return (
    <button
      type="button"
      onClick={cyclePlaybackRate}
      disabled={!track}
      aria-label="Playback speed"
      className={`font-medium hover:text-orange-500 transition-colors cursor-pointer disabled:opacity-50 ${className}`}
    >
      {playbackRate}x
    </button>
  );
};
