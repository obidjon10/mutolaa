import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";
import { IUser } from "@/modules/auth";

export interface IUpdateProfileBody {
  full_name?: string;
  birth_date?: string;
  country?: number;
  region?: number;
  gender?: "male" | "female";
  job?: string;
  avatar?: File;
}

const toFormData = (body: IUpdateProfileBody) => {
  const fd = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (value === undefined || value === null) continue;
    fd.append(key, value instanceof File ? value : String(value));
  }
  return fd;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: IUpdateProfileBody): Promise<IUser> => {
      const hasAvatar = params.avatar instanceof File;
      const { data } = await $api.patch<IUser>(
        "/web/users/UpdateProfile/",
        hasAvatar ? toFormData(params) : params,
        hasAvatar
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : undefined,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-detail"] });
    },
  });
};
