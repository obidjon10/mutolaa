import { useTranslations } from "next-intl";
import { toast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";
import { getApiErrorMessage } from "@/modules/common";

import { manageSubscriptionQueryKeys } from "../constants";
import { ICancelSubscriptionPayload } from "../models";

export const useCancelSubscription = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICancelSubscriptionPayload) => {
      await $api.post("/web/premium/CancelSubscription/", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [manageSubscriptionQueryKeys.SUBSCRIPTION_DETAIL],
      });
    },
    onError: (err) => {
      toast.danger(getApiErrorMessage(err, t("xatolik_yuz_berdi")));
    },
  });
};
