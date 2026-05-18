"use client";

import { useAudioReadInfoReporter } from "../hooks/use-audio-read-info-reporter";
import { useAudioReadTimeReporter } from "../hooks/use-audio-read-time-reporter";

import { FullPlayerDrawer } from "./full-player-drawer";

const Reporters = () => {
  useAudioReadInfoReporter();
  useAudioReadTimeReporter();
  return null;
};

export const AudioPlayerRoot = () => (
  <>
    <FullPlayerDrawer />
    <Reporters />
  </>
);
