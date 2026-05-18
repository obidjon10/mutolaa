import { $api } from "@/lib";

export const getFeaturedBooks = () => async () => {
  const { data } = await $api.get("/web/home/FeaturedBooks");

  return data;
};
