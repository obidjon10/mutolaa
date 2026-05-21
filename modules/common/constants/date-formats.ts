export const DATE_FORMAT_DISPLAY = "DD.MM.YYYY";

export const DATE_FORMAT_API = "YYYY-MM-DD";

const pad = (n: number) => String(n).padStart(2, "0");

export const formatDateForDisplay = (
  value?: string | null,
): string => {
  if (!value) return "";
  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year || !month || !day) return "";
  return `${day}.${month}.${year}`;
};

export const formatDateForApi = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
