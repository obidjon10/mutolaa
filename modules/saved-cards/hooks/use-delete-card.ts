import { useTranslations } from "next-intl";
import { toast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";
import { getApiErrorMessage } from "@/modules/common";

import { paymentQueryKeys } from "../constants";

export const useDeleteCard = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cardId: number) => {
      await $api.delete(`/payment/card/DeleteUserCard/${cardId}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [paymentQueryKeys.USER_CARDS],
      });
    },
    onError: (err) => {
      toast.danger(getApiErrorMessage(err, t("xatolik_yuz_berdi")));
    },
  });
};
