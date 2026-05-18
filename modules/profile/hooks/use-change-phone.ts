import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

interface IChangePhoneParams {
  phone: string;
  code: string;
  session: string;
}

export const useChangePhone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: IChangePhoneParams) => {
      const { data } = await $api.post("/web/users/UserChangePhone/", params);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-detail"] });
    },
  });
};
