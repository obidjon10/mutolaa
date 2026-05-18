import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IStreak } from "../models";


export const useStreakMainData = () => {
  const { data, ...args } = useQuery<IStreak>({
    queryKey: ["streak-main-data"],
    queryFn: async () => {
      const { data } = await $api.get("/gamification/StreakMainData/");
      return data;
    },
  });

  return { streak: data, ...args };
};
