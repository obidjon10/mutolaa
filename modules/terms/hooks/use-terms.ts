import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

export const useTerms = () =>
  useQuery<{id?: number; content: string}>({
    queryKey: ["privacy-policy"],
    queryFn: async () => {
      const { data } = await $api.get("/common/PrivacyPolicy/?type=general");
      return data;
    },
  });
