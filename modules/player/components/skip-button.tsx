"use client";

import { ConditionalRender } from "@/modules/common";
import { CurvedArrowLeftIcon, CurvedArrowRightIcon } from "@/modules/icons";

import { useAudioActions, useAudioTrack } from "../context";

interface IProps {
  direction: "back" | "forward";
  seconds?: number;
  size?: number;
  className?: string;
}

export const SkipButton = ({
  direction,
  seconds = 10,
  className = "",
}: IProps) => {
  const { skipBy } = useAudioActions();
  const track = useAudioTrack();
  const delta = direction === "back" ? -seconds : seconds;

  return (
    <button
      type="button"
      onClick={() => skipBy(delta)}
      disabled={!track}
      aria-label={
        direction === "back" ? `Back ${seconds}s` : `Forward ${seconds}s`
      }
      className={`relative cursor-pointer space-y-5 mt-3 flex items-center justify-center text-current disabled:opacity-50 hover:text-orange-500 transition-colors ${className}`}
    >
      <ConditionalRender
        if={direction === "back"}
        else={<CurvedArrowRightIcon />}
      >
        <CurvedArrowLeftIcon />
      </ConditionalRender>
      <span className="absolute text-xs font-semibold pt-0.5">
        {seconds}
      </span>
    </button>
  );
};
