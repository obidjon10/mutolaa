import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

export const usePurchaseFreeze = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageId: number) => {
      const { data } = await $api.post(
        "/gamification/streak-freeze/PurchaseFreezePackage/",
        { package: packageId },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streak-main-data"] });
    },
  });
};
