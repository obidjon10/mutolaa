export interface IReaderBook {
  id: number;
  slug: string;
  title: string;
  authors: { id: number; name: string }[];
  epub_url: string;
  last_location?: string | null;
}

export type HighlightColorType =
  | "red"
  | "amber"
  | "violet"
  | "blue"
  | "emerald"
  | "lime";

export const HIGHLIGHT_COLORS: Record<HighlightColorType, string> = {
  red: "#EF4444",
  amber: "#F59E0B",
  violet: "#8B5CF6",
  blue: "#3B82F6",
  emerald: "#10B981",
  lime: "#84CC16",
};

export interface IHighlight {
  id?: number | string;
  book_slug: string;
  cfi_range: string;
  color: HighlightColorType;
  text: string;
  created_at?: string;
}

export type ReaderFontFamilyType =
  | "Arial"
  | "Garamond"
  | "Caslon"
  | "Noto Sans Georgia"
  | "Times New Roman";

export const READER_FONT_FAMILIES: ReaderFontFamilyType[] = [
  "Arial",
  "Garamond",
  "Caslon",
  "Noto Sans Georgia",
  "Times New Roman",
];

export const FONT_FAMILY_CSS: Record<ReaderFontFamilyType, string> = {
  Arial: "Arial, Helvetica, sans-serif",
  Garamond: "'EB Garamond', Garamond, serif",
  Caslon: "'Libre Caslon Text', 'Caslon', Georgia, serif",
  "Noto Sans Georgia": "'Noto Sans Georgian', 'Noto Sans', sans-serif",
  "Times New Roman": "'Times New Roman', Times, serif",
};

export type ReaderThemeType = "light" | "dark";

export const READER_THEMES: ReaderThemeType[] = ["light", "dark"];

export interface IReaderPrefs {
  fontFamily: ReaderFontFamilyType;
  fontSize: number;
  theme: ReaderThemeType;
}

export const DEFAULT_READER_PREFS: IReaderPrefs = {
  fontFamily: "Caslon",
  fontSize: 16,
  theme: "light",
};

export const READER_FONT_SIZE_MIN = 14;
export const READER_FONT_SIZE_MAX = 32;
export const READER_FONT_SIZE_STEP = 1;
