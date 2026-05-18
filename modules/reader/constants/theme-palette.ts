import { ReaderThemeType } from "../models";

export interface IReaderPalette {
  page: string;
  spineFrame: string;
  spineLine: string;
  shadowFrom: string;
  shadowTo: string;
  text: string;
  selection: string;
}

export const THEME_PALETTE: Record<ReaderThemeType, IReaderPalette> = {
  light: {
    page: "#FAFAF9",
    spineFrame: "#57534E",
    spineLine: "rgba(87,83,78,0.2)",
    shadowFrom: "#E7E5E4",
    shadowTo: "#FAFAF9",
    text: "#111111",
    selection: "rgba(255, 147, 69, 0.25)",
  },
  dark: {
    page: "#1A1A1A",
    spineFrame: "#0A0A0A",
    spineLine: "rgba(255,255,255,0.12)",
    shadowFrom: "#0F0F0F",
    shadowTo: "#1A1A1A",
    text: "#E5E5E5",
    selection: "rgba(255, 147, 69, 0.35)",
  },
};
