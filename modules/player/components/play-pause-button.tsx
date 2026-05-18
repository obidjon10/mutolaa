"use client";

import classNames from "classnames";

import { ConditionalRender } from "@/modules/common";
import { PauseIcon, PlayIcon } from "@/modules/icons";

import { useAudioActions, useAudioPlayback, useAudioTrack } from "../context";

interface IProps {
  size?: "sm" | "lg";
  variant?: "filled" | "ghost";
}

export const PlayPauseButton = ({
  size = "sm",
  variant = "filled",
}: IProps) => {
  const { isPlaying } = useAudioPlayback();
  const { togglePlay } = useAudioActions();
  const track = useAudioTrack();
  const dimension = size === "lg" ? 64 : 48;

  return (
    <button
      type="button"
      onClick={togglePlay}
      disabled={!track}
      aria-label={isPlaying ? "Pause" : "Play"}
      style={{ width: dimension, height: dimension }}
      className={classNames(
        "flex items-center justify-center rounded-full transition-colors disabled:opacity-50",
        {
          "bg-orange-500 text-white hover:bg-orange-600": variant === "filled",
          "bg-white text-black hover:bg-gray-100": variant === "ghost",
        },
      )}
    >
      <ConditionalRender if={isPlaying} else={<PlayIcon />}>
        <PauseIcon />
      </ConditionalRender>
    </button>
  );
};
