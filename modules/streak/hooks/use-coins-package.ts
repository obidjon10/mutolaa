import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { ICoinsPackage } from "../models";

export const useCoinsPackage = () => {
  const { data, ...args } = useQuery<ICoinsPackage[]>({
    queryKey: ["coins-package"],
    queryFn: async () => {
      const { data } = await $api.get("/gamification/streak-freeze/StreakFreezePackageList/");
      return data;
    },
  });

  return { coinsPackage: data, ...args };
};
