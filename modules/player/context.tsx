"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useHls } from "./hooks/use-hls";
import { IPlayerChapter, IPlayerTrack, PLAYBACK_RATES, PlaybackRateType } from "./models";

export type SleepTimerModeType = number | "end" | null;

// Stable callbacks — references never change after mount.
interface IAudioActions {
  loadTrack: (track: IPlayerTrack) => void;
  loadChapter: (index: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  skipBy: (seconds: number) => void;
  cyclePlaybackRate: () => void;
  toggleSoundEffect: () => void;
  openFullPlayer: () => void;
  closeFullPlayer: () => void;
  closePlayer: () => void;
  setSleepTimer: (mode: SleepTimerModeType) => void;
}

// Slow-changing flags driven by user actions or chapter switches.
interface IAudioPlaybackState {
  isPlaying: boolean;
  playbackRate: PlaybackRateType;
  isFullPlayerOpen: boolean;
  soundEffect: boolean;
  hasSoundEffect: boolean;
  chapters: IPlayerChapter[];
  currentChapterIndex: number;
  sleepTimerMode: SleepTimerModeType;
}

// High-frequency time values. currentTime ticks every animation frame.
interface IAudioTimeState {
  currentTime: number;
  duration: number;
}

const ActionsContext = createContext<IAudioActions | null>(null);
const TrackContext = createContext<IPlayerTrack | null>(null);
const PlaybackContext = createContext<IAudioPlaybackState | null>(null);
const TimeContext = createContext<IAudioTimeState | null>(null);
// Isolated from TimeContext so the sleep-timer countdown (500 ms cadence,
// only while active) doesn't drag a 60 Hz animation-frame update with it.
const SleepTimerRemainingContext = createContext<number | null>(null);

const useNonNullContext = <T,>(ctx: React.Context<T | null>, name: string): T => {
  const value = useContext(ctx);
  if (value === null) {
    throw new Error(`${name} must be used within AudioPlayerProvider`);
  }
  return value;
};

export const AudioPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { attach, destroy } = useHls();

  const [track, setTrack] = useState<IPlayerTrack | null>(null);
  const [chapters, setChapters] = useState<IPlayerChapter[]>([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [soundEffect, setSoundEffect] = useState(false);
  const [hasSoundEffect, setHasSoundEffect] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<PlaybackRateType>(1);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [sleepTimerMode, setSleepTimerMode] = useState<SleepTimerModeType>(null);
  const [sleepTimerDeadline, setSleepTimerDeadline] = useState<number | null>(null);
  const [sleepTimerRemainingMs, setSleepTimerRemainingMs] = useState<number | null>(null);

  // ─── Audio event listeners ────────────────────────────────────────────────

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let rafId = 0;
    const startLoop = () => { if (!rafId) rafId = requestAnimationFrame(tick); };
    const stopLoop = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } };
    const tick = () => { setCurrentTime(audio.currentTime || 0); rafId = requestAnimationFrame(tick); };

    const onPlay = () => { setIsPlaying(true); startLoop(); };
    const onPause = () => { setIsPlaying(false); stopLoop(); setCurrentTime(audio.currentTime || 0); };
    const onSeeked = () => setCurrentTime(audio.currentTime || 0);
    const onLoadedMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      stopLoop();
      setSleepTimerMode((prev) => (prev === "end" ? null : prev));
      // Auto-advance to next chapter
      setCurrentChapterIndex((idx) => {
        setChapters((chs) => {
          if (idx < chs.length - 1) {
            const next = idx + 1;
            const nextUrl = soundEffectRef.current ? chs[next].urlWithEffect : chs[next].url;
            attach(audio, nextUrl, () => {
              audio.play().catch(() => {});
            });
            return chs;
          }
          return chs;
        });
        return idx < chapters.length - 1 ? idx + 1 : idx;
      });
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("seeked", onSeeked);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("durationchange", onLoadedMeta);
    audio.addEventListener("ended", onEnded);

    return () => {
      stopLoop();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("seeked", onSeeked);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("durationchange", onLoadedMeta);
      audio.removeEventListener("ended", onEnded);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refs so closures always read the latest values without re-subscribing
  const soundEffectRef = useRef(soundEffect);
  useEffect(() => { soundEffectRef.current = soundEffect; }, [soundEffect]);

  const chaptersRef = useRef(chapters);
  useEffect(() => { chaptersRef.current = chapters; }, [chapters]);

  const currentChapterIndexRef = useRef(currentChapterIndex);
  useEffect(() => { currentChapterIndexRef.current = currentChapterIndex; }, [currentChapterIndex]);

  // ─── Playback rate sync ───────────────────────────────────────────────────

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  // ─── Sleep timer ──────────────────────────────────────────────────────────

  useEffect(() => {
    const tick = () => {
      if (sleepTimerDeadline === null) {
        setSleepTimerRemainingMs(null);
        return;
      }
      const remaining = sleepTimerDeadline - Date.now();
      if (remaining <= 0) {
        setSleepTimerRemainingMs(0);
        setSleepTimerMode(null);
        setSleepTimerDeadline(null);
        audioRef.current?.pause();
        return;
      }
      setSleepTimerRemainingMs(remaining);
    };
    tick();
    if (sleepTimerDeadline === null) return;
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [sleepTimerDeadline]);

  // ─── Core actions ─────────────────────────────────────────────────────────

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const pause = useCallback(() => { audioRef.current?.pause(); }, []);

  const togglePlay = useCallback(() => {
    if (audioRef.current?.paused) play(); else pause();
  }, [play, pause]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Number.isFinite(audio.duration) ? Math.min(time, audio.duration) : time);
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  const skipBy = useCallback((seconds: number) => {
    if (!audioRef.current) return;
    seek(audioRef.current.currentTime + seconds);
  }, [seek]);

  const cyclePlaybackRate = useCallback(() => {
    setPlaybackRate((current) => {
      const idx = PLAYBACK_RATES.indexOf(current);
      return PLAYBACK_RATES[(idx + 1) % PLAYBACK_RATES.length] ?? 1;
    });
  }, []);

  const setSleepTimer = useCallback((mode: SleepTimerModeType) => {
    setSleepTimerMode(mode);
    if (typeof mode === "number") {
      setSleepTimerDeadline(Date.now() + mode * 60_000);
    } else {
      setSleepTimerDeadline(null);
      setSleepTimerRemainingMs(null);
    }
  }, []);

  // ─── Chapter & track loading ──────────────────────────────────────────────

  const loadUrl = useCallback(
    (url: string) => {
      const audio = audioRef.current;
      if (!audio || !url) return;
      setCurrentTime(0);
      setDuration(0);
      attach(audio, url, () => {
        audio.play().catch(() => {});
      });
    },
    [attach],
  );

  const loadChapter = useCallback(
    (index: number) => {
      const chs = chaptersRef.current;
      if (!chs[index]) return;
      setCurrentChapterIndex(index);
      const url = soundEffectRef.current ? chs[index].urlWithEffect : chs[index].url;
      loadUrl(url);
    },
    [loadUrl],
  );

  const loadTrack = useCallback(
    (next: IPlayerTrack) => {
      if (!next?.url) return;

      const chs = next.chapters ?? [];
      const startIdx = next.chapterIndex ?? 0;
      const hasEffect = next.hasSoundEffect ?? false;

      setTrack(next);
      setChapters(chs);
      setCurrentChapterIndex(startIdx);
      setHasSoundEffect(hasEffect);
      setSoundEffect(false);

      // If chapters are provided, use the chapter URL; otherwise use track.url (fragment)
      const url = chs.length > 0 ? chs[startIdx].url : next.url;
      loadUrl(url);
    },
    [loadUrl],
  );

  const toggleSoundEffect = useCallback(() => {
    const audio = audioRef.current;
    const chs = chaptersRef.current;
    const idx = currentChapterIndexRef.current;
    const next = !soundEffectRef.current;

    soundEffectRef.current = next;
    setSoundEffect(next);

    if (!audio || !chs[idx]) return;

    const savedTime = audio.currentTime;
    const wasPlaying = !audio.paused;
    const url = next ? chs[idx].urlWithEffect : chs[idx].url;

    attach(audio, url, () => {
      const doSeek = () => {
        if (savedTime > 0) audio.currentTime = savedTime;
        if (wasPlaying) audio.play().catch(() => {});
      };
      // loadedmetadata must fire before currentTime is seekable
      if (audio.readyState >= 1) {
        doSeek();
      } else {
        audio.addEventListener("loadedmetadata", doSeek, { once: true });
      }
    });
  }, [attach]);

  const openFullPlayer = useCallback(() => {
    setIsFullPlayerOpen((prev) => {
      if (prev) return prev;
      return Boolean(audioRef.current?.src);
    });
  }, []);

  const closeFullPlayer = useCallback(() => setIsFullPlayerOpen(false), []);

  const closePlayer = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    destroy();
    setTrack(null);
    setChapters([]);
    setCurrentChapterIndex(0);
    setIsPlaying(false);
    setIsFullPlayerOpen(false);
    setCurrentTime(0);
    setDuration(0);
    setSoundEffect(false);
    setHasSoundEffect(false);
    setSleepTimerMode(null);
    setSleepTimerDeadline(null);
    setSleepTimerRemainingMs(null);
  }, [destroy]);

  // ─── Cleanup on unmount ───────────────────────────────────────────────────

  useEffect(() => () => destroy(), [destroy]);

  // ─── Sliced context values ────────────────────────────────────────────────

  const actions = useMemo<IAudioActions>(
    () => ({
      loadTrack,
      loadChapter,
      play,
      pause,
      togglePlay,
      seek,
      skipBy,
      cyclePlaybackRate,
      toggleSoundEffect,
      openFullPlayer,
      closeFullPlayer,
      closePlayer,
      setSleepTimer,
    }),
    [
      loadTrack, loadChapter, play, pause, togglePlay, seek, skipBy,
      cyclePlaybackRate, toggleSoundEffect, openFullPlayer, closeFullPlayer, closePlayer, setSleepTimer,
    ],
  );

  const playback = useMemo<IAudioPlaybackState>(
    () => ({
      isPlaying,
      playbackRate,
      isFullPlayerOpen,
      soundEffect,
      hasSoundEffect,
      chapters,
      currentChapterIndex,
      sleepTimerMode,
    }),
    [
      isPlaying, playbackRate, isFullPlayerOpen, soundEffect, hasSoundEffect,
      chapters, currentChapterIndex, sleepTimerMode,
    ],
  );

  const time = useMemo<IAudioTimeState>(
    () => ({ currentTime, duration }),
    [currentTime, duration],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <TrackContext.Provider value={track}>
        <PlaybackContext.Provider value={playback}>
          <SleepTimerRemainingContext.Provider value={sleepTimerRemainingMs}>
            <TimeContext.Provider value={time}>
              {children}
              {/* No src prop — Hls.js or native attachment manages the source */}
              <audio ref={audioRef} preload="metadata" />
            </TimeContext.Provider>
          </SleepTimerRemainingContext.Provider>
        </PlaybackContext.Provider>
      </TrackContext.Provider>
    </ActionsContext.Provider>
  );
};

// Stable action callbacks. Subscribers never re-render from playback changes.
export const useAudioActions = () => useNonNullContext(ActionsContext, "useAudioActions");

// Currently loaded track. Updates only when loadTrack runs.
export const useAudioTrack = () => useContext(TrackContext);

// Slow-changing player state (isPlaying, chapters, sleep mode, etc.).
export const useAudioPlayback = () => useNonNullContext(PlaybackContext, "useAudioPlayback");

// High-frequency time state (currentTime/duration). Use only where a per-frame
// update is needed (e.g. ProgressScrubber).
export const useAudioTime = () => useNonNullContext(TimeContext, "useAudioTime");

// Sleep-timer countdown in ms. null when no countdown is active. Updates at
// 500 ms cadence while a numeric sleep timer is running, otherwise stable.
export const useSleepTimerRemaining = () => useContext(SleepTimerRemainingContext);
