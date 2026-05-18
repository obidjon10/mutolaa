import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IMarketMainSectionList } from "../models";

export const useMainSectionList = () => {
  const { data, ...args } = useQuery<IMarketMainSectionList[]>({
    queryKey: ["market-main-section-list"],
    queryFn: async () => {
      const { data } = await $api.get("/marketplace/MainSectionList/");

      return data;
    },
  });

  return { mainSectionList: data, ...args };
};
