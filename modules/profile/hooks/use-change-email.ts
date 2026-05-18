import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

interface IChangeEmailParams {
  email: string;
  code: string;
  session: string;
}

export const useChangeEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: IChangeEmailParams) => {
      const { data } = await $api.post("/web/users/UserChangeEmail/", params);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-detail"] });
    },
  });
};
