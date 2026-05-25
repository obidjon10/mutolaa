import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { manageSubscriptionQueryKeys } from "../constants";
import { ICancelReason } from "../models";

export const useCancelReasons = (enabled: boolean) =>
  useQuery<ICancelReason[]>({
    queryKey: [manageSubscriptionQueryKeys.CANCEL_REASONS],
    queryFn: async () => {
      const { data } = await $api.get("/web/premium/CancelReasonList/");
      return data;
    },
    enabled,
  });
