import { useCallback, useEffect, useRef } from "react";

import { $api } from "@/lib";
import { getToday, IReadTimePayload, useSetReadTime } from "@/modules/common";

import { useAudioPlayback, useAudioTrack } from "../context";

const INTERVAL_MS = 3 * 60 * 1000;

const sendDirect = (payload: IReadTimePayload) =>
  $api.post("/stats/ReadTimeBulkCreate/", [payload]).catch(() => {});

export const useAudioReadTimeReporter = () => {
  const { isPlaying } = useAudioPlayback();
  const track = useAudioTrack();
  const { mutate } = useSetReadTime();

  const playStartRef = useRef<number | null>(null);
  const accRef = useRef(0);
  const isPlayingRef = useRef(isPlaying);
  const mutateRef = useRef(mutate);
  const trackIdRef = useRef<string | number | null>(null);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { mutateRef.current = mutate; }, [mutate]);

  // useCallback with [] is stable; all values are read through refs at call time.
  const flush = useCallback((direct = false) => {
    if (playStartRef.current !== null) {
      accRef.current += Date.now() - playStartRef.current;
      playStartRef.current = isPlayingRef.current ? Date.now() : null;
    }

    const seconds = Math.floor(accRef.current / 1000);
    accRef.current = 0;
    if (seconds <= 0) return;

    const payload: IReadTimePayload = { read_time: seconds, date: getToday() };
    if (direct) sendDirect(payload);
    else mutateRef.current(payload);
  }, []);

  // Start / stop wall-clock timer and flush on pause
  useEffect(() => {
    if (isPlaying) {
      playStartRef.current = Date.now();
    } else {
      if (playStartRef.current !== null) {
        accRef.current += Date.now() - playStartRef.current;
        playStartRef.current = null;
      }
      flush();
    }
  }, [isPlaying, flush]);

  // Flush old book's time when track changes
  useEffect(() => {
    const prevId = trackIdRef.current;
    trackIdRef.current = track?.id ?? null;
    if (prevId !== null && prevId !== track?.id) {
      flush();
    }
  }, [track?.id, flush]);

  // Periodic flush every 3 minutes while playing
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => flush(), INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPlaying, flush]);

  // Flush on unmount
  useEffect(() => () => flush(true), [flush]);
};
