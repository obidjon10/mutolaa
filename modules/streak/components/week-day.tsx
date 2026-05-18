import { IWeekDay } from "../models";

import { CalendarCell, getLocalToday } from "./calendar-cell";

const WEEKDAY_LABELS: Record<number, string> = {
  1: "Du", // Dushanba
  2: "Se", // Seshanba
  3: "Ch", // Chorshanba
  4: "Pa", // Payshanba
  5: "Ju", // Juma
  6: "Ya", // Shanba
  0: "Sh", // Yakshanba
};

const getWeekdayLabel = (dateStr: string): string => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return WEEKDAY_LABELS[new Date(y, m - 1, d).getDay()];
};

interface IProps {
  day: IWeekDay;
}

export const WeekDay: React.FC<IProps> = ({ day }) => {
  const today = getLocalToday();

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-center text-foreground-muted">
        {getWeekdayLabel(day.date)}
      </p>
      <CalendarCell date={day.date} status={day.status} today={today} />
    </div>
  );
};
