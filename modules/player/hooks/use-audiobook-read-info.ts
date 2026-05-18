import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";

interface IAudiobookReadInfoPayload {
  audiofile: number;
  /** Reading progress as a percentage 0–100. */
  finished_percentage: number;
}

export const useSetAudiobookReadInfo = () =>
  useMutation({
    mutationFn: async (payload: IAudiobookReadInfoPayload) => {
      const { data } = await $api.post("/book/SetAudiobookReadInfo/", payload);
      return data;
    },
  });
