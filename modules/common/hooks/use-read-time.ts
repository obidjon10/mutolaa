import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";

export interface IReadTimePayload {
  read_time: number; // seconds, wall-clock time at 1× speed
  date: string;      // YYYY-MM-DD local date
}

/** Returns today's date in YYYY-MM-DD using the user's local timezone. */
export const getToday = (): string => {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
};

export const useSetReadTime = () =>
  useMutation({
    mutationFn: async (payload: IReadTimePayload) => {
      const { data } = await $api.post("/stats/ReadTimeBulkCreate/", [payload]);
      return data;
    },
  });
