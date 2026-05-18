import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";

interface IEbookReadInfoPayload {
  ebook: number;
  /** Reading progress as a percentage 0–100. */
  finished_percentage: number;
}

export const useSetEbookReadInfo = () =>
  useMutation({
    mutationFn: async (payload: IEbookReadInfoPayload) => {
      const { data } = await $api.post("/book/SetEbookReadInfo/", payload);
      return data;
    },
  });
