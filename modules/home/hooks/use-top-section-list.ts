import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../constants";
import { HomeSectionType } from "../models";
import { getTopSectionList } from "../queries/get-top-section-list";

interface IUseTopSectionListParams {
  search?: string;
}

export const useTopSectionList = ({
  search,
}: IUseTopSectionListParams = {}) => {
  const { data, ...args } = useQuery<HomeSectionType[]>({
    queryKey: [queryKeys.TOP_SECTION_LIST, { search }],
    queryFn: getTopSectionList({ search }),
  });

  return { topSections: data, ...args };
};
