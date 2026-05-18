import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IPremiumPlans } from "../models";

export const usePremiumPlans = () => {
  const { data, ...args } = useQuery<IPremiumPlans[]>({
    queryKey: ["premium-plans"],
    queryFn: async () => {
      const { data } = await $api.get("/web/premium/PremiumPlanList/");

      return data;
    },
  });

  return { plans: data, ...args };
};
