"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { $api } from "@/lib";

import { IHighlight } from "../models";

export const useHighlights = (slug?: string) => {
  const queryClient = useQueryClient();

  const { data: highlights } = useQuery<IHighlight[]>({
    queryKey: ["reader-highlights", slug],
    queryFn: async () => {
      const { data } = await $api.get(`/book/web/Highlights/${slug}`);

      return (data ?? []) as IHighlight[];
    },
    enabled: Boolean(slug),
  });

  const addHighlight = useMutation({
    mutationFn: async (payload: Omit<IHighlight, "id" | "created_at">) => {
      const { data } = await $api.post(`/book/web/Highlights/`, payload);

      return data as IHighlight;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reader-highlights", slug] });
    },
  });

  const removeHighlight = useMutation({
    mutationFn: async (id: number | string) => {
      await $api.delete(`/book/web/Highlights/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reader-highlights", slug] });
    },
  });

  return {
    highlights: highlights ?? [],
    addHighlight,
    removeHighlight,
  };
};
