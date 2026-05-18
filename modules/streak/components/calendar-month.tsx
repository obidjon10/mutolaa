import { ICalendar } from "../models";

import { CalendarCell, getLocalToday } from "./calendar-cell";

const DAYS_OF_WEEK = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

const MONTH_NAMES: Record<number, string> = {
  1: "Yanvar",
  2: "Fevral",
  3: "Mart",
  4: "Aprel",
  5: "May",
  6: "Iyun",
  7: "Iyul",
  8: "Avgust",
  9: "Sentabr",
  10: "Oktabr",
  11: "Noyabr",
  12: "Dekabr",
};

// Number of empty cells before day 1 in a Monday-first grid
const getStartOffset = (year: number, month: number): number => {
  const dayOfWeek = new Date(year, month - 1, 1).getDay(); // 0=Sun, 1=Mon...
  return (dayOfWeek - 1 + 7) % 7; // Mon→0, Tue→1, ..., Sun→6
};

const buildDateString = (year: number, month: number, day: number): string =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

interface IProps {
  calendar: ICalendar;
}

export function CalendarMonth({ calendar }: IProps) {
  const { year, month, total_days, total_completed_days, days } = calendar;
  const today = getLocalToday();
  const startOffset = getStartOffset(year, month);
  const dayStatusMap = new Map(days.map((d) => [d.date, d.status]));

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">
          {MONTH_NAMES[month]} {year}
        </p>
        <p className="font-medium text-sm">
          {total_completed_days}/{total_days}
        </p>
      </div>
      <div className="border border-[#E4E4E7] dark:border-[#27272A] p-4 rounded-2xl mt-4">
        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-6">
          {DAYS_OF_WEEK.map((label) => (
            <div
              key={label}
              className="text-[#27272A] dark:text-[#A1A1AA] text-sm font-medium"
            >
              {label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-4 gap-x-2 place-items-center">
          {Array.from({ length: startOffset }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`empty-${i}`} className="size-7.5" />
          ))}
          {Array.from({ length: total_days }).map((_, i) => {
            const dateStr = buildDateString(year, month, i + 1);
            const status = dayStatusMap.get(dateStr) ?? "future";
            return (
              <CalendarCell
                key={dateStr}
                date={dateStr}
                status={status}
                today={today}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
