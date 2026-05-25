import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { manageSubscriptionQueryKeys } from "../constants";
import { ISubscriptionDetail } from "../models";

export const useSubscriptionDetail = () =>
  useQuery<ISubscriptionDetail>({
    queryKey: [manageSubscriptionQueryKeys.SUBSCRIPTION_DETAIL],
    queryFn: async () => {
      const { data } = await $api.get("/web/premium/SubscriptionDetail/");
      return data;
    },
  });
