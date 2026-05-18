import qs from "query-string";

import { $api } from "@/lib";

import { HomeSectionType } from "../models";

interface ITopSectionListParams {
  search?: string;
}

export const getTopSectionList =
  (params: ITopSectionListParams = {}) =>
  async () => {
    const { data } = await $api.get<HomeSectionType[]>(
      qs.stringifyUrl(
        {
          url: "/web/home/TopSectionList/",
          query: params as qs.StringifiableRecord,
        },
        { skipNull: true, skipEmptyString: true },
      ),
    );

    return data;
  };
