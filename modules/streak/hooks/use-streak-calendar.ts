import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { $api } from "@/lib";
import { IQueryResponse } from "@/modules/common";

import { ICalendar } from "../models";

const CALENDAR_LIMIT = 5;

export const useStreakCalendar = () => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<ICalendar>,
    Error,
    InfiniteData<IQueryResponse<ICalendar>, number>,
    string[],
    number
  >({
    queryKey: ["streak-calendar"],
    queryFn: async ({ pageParam }) => {
      const { data } = await $api.get<IQueryResponse<ICalendar>>(
        "/gamification/streak-activity/StreakCalendar/",
        { params: { limit: CALENDAR_LIMIT, offset: pageParam } },
      );
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.next ? lastPageParam + CALENDAR_LIMIT : undefined,
  });

  const calendars = data?.pages.flatMap((page) => page.results) ?? [];
  return { calendars, data, ...args };
};
