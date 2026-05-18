export interface IPlayerChapter {
  id: number;
  title: string;
  duration: number;
  url: string;           // hls_playlist_file
  urlWithEffect: string; // hls_playlist_file_with_sound_effect
}

export interface IPlayerTrack {
  id: string | number;
  url: string;
  title: string;
  subtitle?: string;
  cover: string;
  /** Book slug for shareable link (/book/{slug}). */
  slug?: string;
  /** Full chapter list — present only when user has audiobook access. */
  chapters?: IPlayerChapter[];
  /** Index of the chapter to start from (default 0). */
  chapterIndex?: number;
  /** Whether this audiobook has a sound-effect variant. */
  hasSoundEffect?: boolean;
}

export const PLAYBACK_RATES = [1, 1.25, 1.5, 1.75, 2] as const;
export type PlaybackRateType = (typeof PLAYBACK_RATES)[number];
