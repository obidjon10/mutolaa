import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IBadgeWrapper } from "../models";

export const useBadgeList = () =>
  useQuery({
    queryKey: ["badge-list"],
    queryFn: async (): Promise<IBadgeWrapper[]> => {
      const { data } = await $api.get<IBadgeWrapper[]>(
        "/gamification/BadgeList/",
      );
      return data;
    },
  });
