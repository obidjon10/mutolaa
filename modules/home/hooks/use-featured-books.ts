import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../constants";
import { IFeaturedBooks } from "../models";
import { getFeaturedBooks } from "../queries";

export const useFeaturedBooks = () => {
  const { data, ...args } = useQuery<IFeaturedBooks[]>({
    queryKey: [queryKeys.FEATURED_BOOKS],
    queryFn: getFeaturedBooks(),
  });

  return { featuredBooks: data, ...args };
};
