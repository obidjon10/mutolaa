import { SnowflakeFrozenIcon } from "@/modules/icons";

export const getLocalToday = (): string => {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
};

const getDayNumber = (dateStr: string): string =>
  String(Number(dateStr.split("-")[2]));

const CIRCLE_BASE =
  "rounded-full size-7.5 flex items-center justify-center text-xs font-medium";

interface IProps {
  date: string;
  status: string;
  today: string;
}

export function CalendarCell({ date, status, today }: IProps) {
  const dayNumber = getDayNumber(date);

  if (date > today) {
    return (
      <div
        className={`${CIRCLE_BASE} bg-muted dark:bg-muted-dark text-gray-400 dark:text-[#52525B]`}
      >
        {dayNumber}
      </div>
    );
  }

  if (status === "frozen") {
    return (
      <div className="relative size-7.5 mt-1 flex items-center justify-center">
        <SnowflakeFrozenIcon
          width={36}
          height={40}
          aria-label="Frozen"
          role="img"
        />
        <span className="absolute inset-x-0 top-[45%] -translate-y-1/2 text-center text-xs font-medium text-white pointer-events-none">
          {dayNumber}
        </span>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className={`${CIRCLE_BASE} bg-[#84CC16] text-white`}>
        {dayNumber}
      </div>
    );
  }

  if (status === "period_break") {
    return (
      <div className={`${CIRCLE_BASE} bg-[#EF4444] text-white`}>
        {dayNumber}
      </div>
    );
  }

  if (date === today) {
    return (
      <div className={`${CIRCLE_BASE} border border-brand font-bold`}>
        {dayNumber}
      </div>
    );
  }

  return (
    <div
      className={`${CIRCLE_BASE} bg-muted dark:bg-[#27272A] text-black dark:text-white`}
    >
      {dayNumber}
    </div>
  );
}
