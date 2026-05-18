import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../constants";
import { ICategory } from "../models";
import { getCategories } from "../queries";

export const useCategories = () => {
  const { data, ...args } = useQuery<ICategory[]>({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: getCategories(),
  });

  return { categories: data, ...args };
};
