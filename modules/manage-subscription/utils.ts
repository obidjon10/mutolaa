import { formatDateForDisplay } from "@/modules/common/constants/date-formats";

/** Parses both "YYYY-MM-DD HH:mm:ss" and ISO strings. */
export const formatPeriodDate = (value?: string | null): string => {
  if (!value) return "";
  return formatDateForDisplay(value.replace(" ", "T"));
};

/** Whole days from now until `value`. Returns 0 for past dates. */
export const daysUntil = (value?: string | null): number => {
  if (!value) return 0;
  const target = new Date(value.replace(" ", "T")).getTime();
  if (Number.isNaN(target)) return 0;
  const diffMs = target - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
};

// Month names — Uzbek and Karakalpak Latin share the same Latin spellings.
const MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
] as const;

export interface IDateParts {
  day: number;
  month: string;
  year: number;
}

/** Splits an ISO/SQL datetime into day/month-name/year parts for templating. */
export const getDateParts = (value?: string | null): IDateParts | null => {
  if (!value) return null;
  const d = new Date(value.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return null;
  return {
    day: d.getDate(),
    month: MONTHS[d.getMonth()],
    year: d.getFullYear(),
  };
};
