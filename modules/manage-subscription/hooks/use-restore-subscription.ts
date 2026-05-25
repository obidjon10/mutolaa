import { useTranslations } from "next-intl";
import { toast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";
import { getApiErrorMessage } from "@/modules/common";

import { manageSubscriptionQueryKeys } from "../constants";

interface IArgs {
  id: number;
  card: number;
}

export const useRestoreSubscription = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, card }: IArgs) => {
      await $api.post(`/web/premium/RestoreSubscription/${id}/`, { card });
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
