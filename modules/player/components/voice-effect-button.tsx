"use client";

import classNames from "classnames";

import { VoiceEffectIcon } from "@/modules/icons";

import { useAudioActions, useAudioPlayback } from "../context";

interface IProps {
  className?: string;
}

export const VoiceEffectButton = ({ className }: IProps) => {
  const { soundEffect, hasSoundEffect } = useAudioPlayback();
  const { toggleSoundEffect } = useAudioActions();

  if (!hasSoundEffect) {
    return <VoiceEffectIcon className={classNames("opacity-30", className)} />;
  }

  return (
    <button
      type="button"
      onClick={toggleSoundEffect}
      aria-pressed={soundEffect}
      className={classNames(
        "transition-colors",
        soundEffect ? "text-orange-500" : "opacity-70 hover:opacity-100",
        className,
      )}
    >
      <VoiceEffectIcon />
    </button>
  );
};
