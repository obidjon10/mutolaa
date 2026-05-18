import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IPremiumFeatures } from "../models";

export const usePremiumFeatures = () => {
  const { data, ...args } = useQuery<IPremiumFeatures[]>({
    queryKey: ["premium-features"],
    queryFn: async () => {
      const { data } = await $api.get("/web/premium/PremiumFeatureItemList/");

      return data;
    },
  });

  return { features: data, ...args };
};
