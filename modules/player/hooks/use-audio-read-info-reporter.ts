import { useEffect, useRef } from "react";

import { useAudioPlayback, useAudioTime } from "../context";

import { useSetAudiobookReadInfo } from "./use-audiobook-read-info";

const REPORT_INTERVAL_MS = 300_000;

const toPct = (currentTime: number, duration: number): number =>
  duration > 0 ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;

/** Reports audiobook read progress to the backend silently. */
export const useAudioReadInfoReporter = () => {
  const { isPlaying, chapters, currentChapterIndex } = useAudioPlayback();
  const { currentTime } = useAudioTime();
  const { mutate } = useSetAudiobookReadInfo();

  // Refs so interval/effect callbacks always read the latest values
  const isPlayingRef = useRef(isPlaying);
  const currentTimeRef = useRef(currentTime);
  const chaptersRef = useRef(chapters);
  const chapterIndexRef = useRef(currentChapterIndex);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { currentTimeRef.current = currentTime; }, [currentTime]);
  useEffect(() => { chaptersRef.current = chapters; }, [chapters]);
  useEffect(() => { chapterIndexRef.current = currentChapterIndex; }, [currentChapterIndex]);

  const report = (chapterIndex: number, pct: number) => {
    const chapter = chaptersRef.current[chapterIndex];
    if (!chapter) return;
    mutate({ audiofile: chapter.id, finished_percentage: pct });
  };

  // Send percentage when playback pauses
  useEffect(() => {
    if (isPlaying) return;
    const idx = chapterIndexRef.current;
    const chapter = chaptersRef.current[idx];
    if (chapter && currentTimeRef.current > 0) {
      report(idx, toPct(currentTimeRef.current, chapter.duration));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Mark previous chapter 100% when auto-advance moves to next
  const prevChapterIndexRef = useRef(currentChapterIndex);
  useEffect(() => {
    const prev = prevChapterIndexRef.current;
    prevChapterIndexRef.current = currentChapterIndex;

    if (currentChapterIndex > prev) {
      report(prev, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapterIndex]);

  // Heartbeat every 15 s while playing
  useEffect(() => {
    if (!isPlaying) return;

    const id = setInterval(() => {
      const idx = chapterIndexRef.current;
      const chapter = chaptersRef.current[idx];
      const ct = currentTimeRef.current;
      if (chapter && ct > 0) {
        report(idx, toPct(ct, chapter.duration));
      }
    }, REPORT_INTERVAL_MS);

    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);
};
