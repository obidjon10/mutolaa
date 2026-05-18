import { $api } from "@/lib";

import { ICategory } from "../models";

export const getCategories = () => async () => {
  const { data } = await $api.get<ICategory[]>("/web/book/CategoryList");

  return data;
};
